import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';


registerBlockType('iriz/pixel-art', {
    title: __('Pixel Art', 'iriz'),
    icon: 'art',
    category: 'widgets',
    attributes: {
        size: {
            type: 'number',
            default: 128,
        },
        pixels: {
            type: 'string',
            default: '[]', // Assuming pixel data is stored as JSON string.
        },
    },
    edit: (props) => {
        const { attributes, setAttributes } = props;
        const { size, pixels } = attributes;
        const [pixelData, setPixelData] = useState([]);

        useEffect(() => {
            const fetchPixelData = async () => {
                // Fetch pixel data from WordPress REST API or options.
                const response = await fetch('/wp-json/iriz-pixel-api/v1/data');
                const data = await response.json();
                setPixelData(JSON.parse(data.pixels));
            };

            fetchPixelData();
        }, []);

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'iriz')}>
                        <RangeControl
                            label={__('Size', 'iriz')}
                            value={size}
                            onChange={(newSize) => setAttributes({ size: newSize })}
                            min={16}
                            max={512}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="iriz-pixel-art-placeholder">
                    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        {pixelData.map((row, rowIndex) =>
                            row.map((color, colIndex) => (
                                <rect key={`${rowIndex}-${colIndex}`} x={colIndex} y={rowIndex} width="1" height="1" fill={color} />
                            ))
                        )}
                    </svg>
                </div>
            </>
        );
    },
    save: () => null,
});

