"use strict";

// Define the colors and corner radius
const strokeColor = hexToRgb('#9747FF');
const fillColor = hexToRgb('#0F1014');
const cornerRadius = 20;
const strokeWeight = 2;
const dashPattern = [10, 5]; // Define the dash and gap pattern
const selectedNodes = figma.currentPage.selection;

if (selectedNodes.length > 0) {
    selectedNodes.forEach(node => {
        // Check if the node supports fills and strokes
        if ('fills' in node && 'strokes' in node) {
            node.fills = [{ type: 'SOLID', color: fillColor }];
            node.strokes = [{ type: 'SOLID', color: strokeColor }];
        }
        
        // Check if the node supports strokeWeight and strokeDashes
        if ('strokeWeight' in node && 'strokeDashes' in node) {
            node.strokeWeight = strokeWeight; // Set the stroke weight
            node.strokeDashes = dashPattern; // Set the dash pattern
        }

        // Check if the node supports cornerRadius by checking its type
        if (node.type === 'RECTANGLE' || node.type === 'FRAME' || node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
            node.cornerRadius = cornerRadius;
        }
    });
    figma.notify('Colors, stroke, and corner radius applied successfully.');
} else {
    figma.notify('Please select at least one component.');
}

figma.closePlugin();

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b };
}