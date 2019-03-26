import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import Grid from './Grid';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Grid />, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('shows loading message by default', () => {
    // Render a checkbox with label in the document
    const grid = shallow(<Grid columnDefs={[{
        headerName: "Id", field: "id"
    }, {
        headerName: "CompanyName", field: "CompanyName"
    }, {
        headerName: "Address", field: "Address"
    }, {
        headerName: "City", field: "City"
    }, {
        headerName: "State", field: "State"
    }, {
        headerName: "Zipcode", field: "Zipcode"
    }, {
        headerName: "Phone", field: "Phone"
    }, {
        headerName: "Fax", field: "Fax"
    }, {
        headerName: "Website", field: "Website"
    }]}
        pageSize={10}
        sortCol={"id"}
    />);
    expect(grid.html()).toEqual('<div>Loading...</div>');
});


it('when rendering Grid, fetch is called once', done => { // 1
    // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Grid />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    //expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/data?_page=1&_limit=undefined&_sort=undefined');

    process.nextTick(() => { // 6
        global.fetch.mockClear(); // 7
        done(); // 8
    });
});
