This front-end application is a statically served HTML document that leverages JavaScript and a CSV parsing library to consume data from an external cloud-based spreadsheet and render it into structured tabular formats within the DOM.

Architectural Overview:
Initialization & Event Binding
Upon window load, a function is automatically invoked to trigger the data retrieval pipeline. A user-interactive button is also configured to allow manual refresh of the data rendering process without reloading the page.

External Data Source Integration
The application constructs a direct link to a cloud spreadsheet export endpoint, requesting data in CSV format via HTTP. The external document must be publicly accessible to avoid CORS violations.

Data Acquisition Layer
The fetch() API is employed to retrieve the remote CSV file. If successful, the raw textual content is handed off to the parsing layer; otherwise, a fallback alert and error logging mechanism is triggered.

Client-Side CSV Parsing
The application utilizes a client-side CSV parser to transform the raw delimited string into a structured two-dimensional array. This abstraction decouples the data source format from the rendering logic.

DOM Rendering Logic
Using JavaScript, the application programmatically constructs table headers and rows by iterating through the parsed dataset. Any previously rendered content is cleared prior to injection to ensure stateless rendering.

Dynamic UI Composition
Two distinct data tables are rendered into the document object model (DOM), each targeting different segments of the dataset. All DOM manipulation is performed without reliance on external frameworks.

Responsive Styling & UX Enhancements
The layout employs CSS for visual hierarchy, responsive scaling, and user experience optimization. Sticky headers and columns are implemented for better navigation in horizontally scrollable views.

Error Handling & Fallbacks
In case of network failure or access restriction, the application displays a user-facing alert and logs the error to the browser console to aid debugging.
