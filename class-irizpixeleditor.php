<?php
/**
 * Plugin Name: Iriz Pixel Editor
 *
 * @package IrizPixelEditor
 *
 * Description: A simple plugin to draw pixel art.
 * Plugin URI: https://github.com/web4mybiz/iriz-pixel-editor
 * Version: 1.0
 * Requires at least: 3.0
 * Requires PHP: 5.0
 * Author: Rizwan Iliyas
 * Author URI: https://github.com/web4mybiz
 * License:  GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:
 * Text Domain: iriz-pixel-editor
 * Domain Path: /languages
 */

defined( 'ABSPATH' ) || die( 'Access Denied' );
/**
 * Pixel Editor plugin base class
 */
class IrizPixelEditor {
	/**
	 * Constructor to load required files
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_menu', array( $this, 'pixel_editor_menu' ) );
	}
	/**
	 * Enqueue scripts.
	 */
	public function enqueue_scripts() {
	}

	/**
	 * Admin menu function.
	 */
	public function pixel_editor_menu() {
		add_menu_page( 'Pixel Editor Page', 'Pixel Editor', 'manage_options', 'iriz-pixel-editor', array( $this, 'pixel_editor_page' ), 'dashicons-admin-customizer', 20 );
	}

	/**
	 * Pixel Editor page content.
	 */
	public function pixel_editor_page() {
		?>
		<div class="wrap">
			<h1>Pixel Editor</h1>
			<div id="pixel-admin-app">Hello!</div>
		</div>
		<?php
	}
}

if ( class_exists( 'IrizPixelEditor' ) ) {
	new IrizPixelEditor();
}
