**Cypress Test Suite: Alerts Handling & Random Data Using Faker**

**Overview**
This Cypress test suite demonstrates how to handle different types of alerts and generate random data using Faker. It covers interactions with alert boxes, confirmation dialogs, and 
prompt dialogs, as well as form submission using randomly generated data.

**Test Structure**
describe('Using FakerJS for randomData & handling Alerts', () => {...}): Root describe block for organizing tests.
before(): Initializes the test environment.
context('Creating Data with Faker & Fill Form'): Contains tests related to form filling with Faker-generated data.
context('Handling Alerts'): Contains tests for handling various alert dialogs.

**Test Suite Breakdown**

1. **Setup and Initialization**
before() Hook: Sets up the test environment by navigating to the demo page and handling uncaught exceptions to prevent test failures.

2. **Creating Data with Faker & Filling Form**
context('Creating Data with Faker & Fill Form'): Includes tests for generating random data using Faker and filling out a registration form with this data.

3. **Generating Random Data:**
First Name, Last Name, Contact Number, Email Address, Gender, Address, Skills, Country, Hobbies, Date of Birth (DOB)
**Form Interaction:**
Filling in text fields (First Name, Last Name, Address, Email, Phone Number)
Selecting options from dropdowns (Gender, Skills, Country, DOB)
Uploading a file
Checking checkboxes and radio buttons
Verifying form input values

5. **Handling Alerts**
context('Handling Alerts'): Includes tests for interacting with and verifying browser alert dialogs.

**Simple Alert:**
Triggering an alert and verifying its text.

**Confirmation Box:**
Triggering a confirmation box, simulating a 'Cancel' action, and verifying the resulting message.

**Prompt Box with Textbox:**
Triggering a prompt dialog, simulating user input, and verifying the displayed result.

**Prerequisites**
Ensure Cypress is installed in your project. 
You can install it using npm:
npm install cypress --save-dev

Ensure @faker-js/faker is installed for generating random data:
npm install @faker-js/faker --save-dev

**Notes**
Customize the Faker settings and form selectors according to your specific application and testing needs.
Update the URL in the intercept and visit commands if using a different demo or application URL.

