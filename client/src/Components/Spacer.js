import React from "react";

export default function Spacer({children, spacing=50}) {
    return (
        // This div will contain all the children passed to the Spacer component
        <div style={{display: "flex", flexDirection: "row", maxWidth: "80%"}}>
            {React.Children.map(children, (child, index) => { // Iterate over all the children
                return (
                    // Add a margin to the right of each child except the last one
                    // {{}} allow to pass an object to the style attribute and use some logic
                    <div style={{marginRight: index === children.length - 1 ? 0 : spacing}} key={index}>
                        {child}
                    </div>
                );
            })}
        </div>
    );
}