import React from "react"; 
import ReactDOM from "react-dom"; 
import renderer from "react-test-renderer";

import Card from "./Card";

describe ("<Card />", ()=>{ 
	it ("renders without crashing", ()=>{ 
		const div = document.createElement("div"); 
		ReactDOM.render(<Card 
			key="e" 
			title="my title" 
			content="stuff" 
			/>, div) 
		// Clean up 
		ReactDOM.unmountComponentAtNode(div); 
	})

    it('snapshot matches expected', () => {
        // Render the component, as JSON
        const tree = renderer.create(<Card 
        	key="e" 
        	title="my title" 
        	content="stuff" 
        	/>).toJSON();
        // Check whether it matches the previous snapshot
        // Stored in __snapshots__/Card.test.js.snap
        expect(tree).toMatchSnapshot();
    });
});