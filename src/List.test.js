import React from "react"; 
import ReactDOM from "react-dom"; 
import renderer from "react-test-renderer";

import List from "./List";

describe ("<List />", ()=>{ 
    const cardData = 
    [
    { id: 'a', title: 'First card', content: 'lorem ipsum' },
    { id: 'b', title: 'Second card', content: 'lorem ipsum' },
    { id: 'c', title: 'Third card', content: 'lorem ipsum' }
    ];
	it ("renders without crashing", ()=>{ 
		const section = document.createElement("section"); 
		ReactDOM.render(<List 
            header="my header" 
            key="r" 
            cards={cardData} />, section) 
		// Clean uppp
		ReactDOM.unmountComponentAtNode(section); 
	})

    it('snapshot matches expected', () => {
        // Render the component, as JSON
        const tree = renderer.create(<List 
            header="my header" 
            key="r" 
            cards={cardData} />).toJSON();
        // Check whether it matches the previous snapshot
        // Stored in __snapshots__/Card.test.js.snap
        expect(tree).toMatchSnapshot();
    });
});