<?php
/**
 * Iriz Pixel Art Plugin.
 *
 * @package IrizPixelArt
 */

defined( 'ABSPATH' ) || die( 'Access denied' );

/**
 * Dashboard widget API class.
 */
class IrizPixelBlock {

	/**
	 * Construtor.
	 * Configuring Block esentials.
	 */
	public function __construct() {
		add_shortcode( 'show_pixels', array( $this, 'render_pixel_art_block' ) );
	}

	/**
	 * Rendering the block.
	 *
	 * @param  array $attributes  An associative array of initialization attributes.
	 */
	public function render_pixel_art_block( $attributes ) {
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
