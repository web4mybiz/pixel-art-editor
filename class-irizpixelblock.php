<?php
/**
 * Iriz Pixel Editor Plugin.
 *
 * @package IrizPixelEditor
 */

defined( 'ABSPATH' ) || die( 'Access denied' );

/**
 * Pixel Editor block class.
 */
class IrizPixelBlock {

	/**
	 * Construtor.
	 * Configuring Block esentials.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'pixel_editor_block_assets' ) );
		add_action( 'init', array( $this, 'register_pixel_editor_block' ) );
	}
	/**
	 * Register and enqueue the block's assets.
	 */
	public function pixel_editor_block_assets() {
		wp_register_script(
			'pixel-editor-block',
			plugins_url( 'pixel-editor/dist/block.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-editor' ),
			wp_rand( 1, 100 ),
			true
		);
	}

	/**
	 * Registering the block.
	 */
	public function register_pixel_editor_block() {
		register_block_type(
			'iriz/pixel-art',
			array(
				'attributes'      => array(
					'size' => array(
						'type'    => 'number',
						'default' => 128,
					),
				),
				'editor_script'   => 'pixel-editor-block',
				'render_callback' => array( $this, 'render_pixel_editor_block' ),
			)
		);
	}

	/**
	 * Rendering the block.
	 *
	 * @param  array $attributes  An associative array of initialization attributes.
	 */
	public function render_pixel_editor_block( $attributes ) {
		$size   = isset( $attributes['size'] ) ? $attributes['size'] : 128;
		$pixels = get_option( 'iriz_pixel_art_data', wp_json_encode( array_fill( 0, 16, array_fill( 0, 16, '#FFFFFF' ) ) ) );

		$pixels = json_decode( $pixels, true );

		ob_start();
		?>
		<svg width="<?php echo esc_attr( $size ); ?>" height="<?php echo esc_attr( $size ); ?>" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<?php
			for ( $row = 0; $row < 16; $row++ ) {
				for ( $col = 0; $col < 16; $col++ ) {
					$color = esc_attr( $pixels[ $row ][ $col ] );
					echo "<rect x='" . esc_attr( $col ) . "' y='" . esc_attr( $row ) . "' width='1' height='1' fill='" . esc_attr( $color ) . "' />";
				}
			}
			?>
		</svg>
		<?php
		return ob_get_clean();
	}
}
