# Technical assessment for UI developer position.

## To run this project
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## PCI Energy Solutions

Requirements: Most recent LTS version of Node. If you cannot install this version of Node on your machine, you can code/pseudo-code to the best of your ability.

This is an example project that presents you with a made-up scenario that will mimic some of the tasks that may need to be completed on a daily basis at PCI. It is intended to allow you to showcase your experience. If at any point something is unclear, please list it within this README. If you make any assumptions along the way, list those here as well. Also feel free to write anything else here that you would like considered when we review your approach. Do not install any new packages. We should be able to view your UI after running "npm install" and "npm start". Do not make any changes to the data source "near-earth-asteroids.json". If you feel you cannot complete one of the tasks, please move on to the next one and explain in this README.

### Scenario

Within this repo is a demo UI that our team needs to make some changes to before it goes to production. Clients have requested some new features, and it is your job to implement those. We have a few "stories" (or changes to be made) below. Please commit your changes along the way. On your final commit for each change, use the message "Task #X" where X is the number next to the task below. The documentation for our grid component can be found here: <https://www.ag-grid.com/react-data-grid/>.

1. **[Complete]** The client would like a title on this page. Above the table, but within the app window, add a title that says "Near-Earth Object Overview". Please also make this title replace the default "React App" that shows on the tab for this window. This will give a clear indication of what the table and application are for.
2. While this list of data is great, it would be useful for the user to be able to interact with beyond scrolling. We need to add sorting to the grid. Make the changes necessary to allow the user to sort all columns. String columns should sort alphabetically. Numerical columns should sort by value. Date columns should sort chronologically. In addition to sorting, the user wants to be able to filter their data. Numeric columns should have a filter that supports numerical filtering, and string columns should have a filter that supports string filtering.
3. **[Complete]** The users have complained that the dates are not very readable. Please display the dates in a format that is more human-readable. I will trust your input on what format is best in this case.
4. **[Complete]** Rather than just displaying Y or N or n/a in the Potentially Hazardous column, we should display "Yes", "No", and a blank cell for those values respectively.
5. **[Incomplete (No Access): Range Selection and Clipboard functionalities are limited to Enterprise users]** 
The users would like to be able to copy the information from this grid into a software like Excel. The user should be able to select any portion of this grid, copy the data, and paste it into excel. When they do this, they should get only the data that is copied, and they should get that data as it is displayed within the grid.\

   **Note from Luc**: upon research, it seems like Range Selection and clipboard (copy-paste) functionalities are limited to enterprise users (please refer to https://www.ag-grid.com/react-data-grid/clipboard/ and https://www.ag-grid.com/react-data-grid/range-selection/). 
    Their would-be implementation will be shown below:

    First import enterprise library to enable functionalities
    ```
    import 'ag-grid-enterprise';
    ```
    
    Then set enableRangeSelection and copyHeadersToClipboard values to true in the AgGridReact component:
    ```
    <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        enableRangeSelection={true}
        copyHeadersToClipboard={true}
    />
    ```
    **In the meantime, Task #5 will be completed with the closest functionality available to community users: row selection.**

7. The users want to be able to quickly clear all filtering and sorting that is going on in their grid. They want one button they can click that will restore the grid to it's default view, unfiltered and unsorted. Can you add a button (of any kind) to the right of the title we added previously? The button should say "Clear Filters and Sorters" and should be positioned with a 15px space between the title and the button.
8. Lastly, this grid is going to go to production soon, and other developers will begin doing work on this project. While creating this demo, considerations were not made to keep the code clean and organized. Please organize this codebase so that it is easier to find and make changes to components, as well as finding any interfaces, types, or helper functions.

After completing this project, please push any changes you made to a publicly accessible GitLab or GitHub repository and include that link in an email to your contact at PCI. Thank you!
