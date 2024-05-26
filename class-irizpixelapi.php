<?php
/**
 * Iriz Pixel Editor Plugin.
 *
 * @package IrizPixelEditor
 */

defined( 'ABSPATH' ) || die( 'Access denied' );

/**
 * Pixel Editor API class.
 */
class IrizPixelAPI {
	/**
	 * API endpoint namespace.
	 *
	 * @var string
	 */
	private $namespace = 'iriz-pixel-api/v1';

	/**
	 * API endpoint base.
	 *
	 * @var string
	 */
	private $endpoint_base = 'data';

	/**
	 * Construtor.
	 * Configuring API endpoints.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
	}

	/**
	 * Registering endpoints.
	 */
	public function register_endpoints() {
		register_rest_route(
			$this->namespace,
			'/' . $this->endpoint_base,
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_pixel_data' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->endpoint_base,
			array(
				'methods'  => 'POST',
				'callback' => array( $this, 'store_pixel_data' ),
			)
		);
	}

	/**
	 * Get wp options records for endpoints.
	 *
	 * @param WP_REST_Request $request The REST API request object.
	 */
	public function get_pixel_data( $request ) {

		// Get the pixel data from the WordPress option.
		$request = get_option( 'iriz_pixel_art_data' );

		if ( false === $request ) {
			return new WP_REST_Response( array( 'message' => 'No pixel data found' ), 404 );
		}

		return new WP_REST_Response( array( 'pixels' => $request ), 200 );
	}


	/**
	 * Store pixel records through endpoints.
	 *
	 * @param WP_REST_Request $request The REST API request object.
	 */
	public function store_pixel_data( $request ) {
		$pixels = $request->get_param( 'pixels' );

		// Update the WordPress option with the new pixel data.
		$result = update_option( 'iriz_pixel_art_data', $pixels );

		if ( false === $result ) {
			return new WP_REST_Response( array( 'message' => 'Failed to store pixel data' ), 500 );
		}

		return new WP_REST_Response(
			array(
				'message' => 'Pixel data stored successfully',
			),
			200
		);
	}
}
