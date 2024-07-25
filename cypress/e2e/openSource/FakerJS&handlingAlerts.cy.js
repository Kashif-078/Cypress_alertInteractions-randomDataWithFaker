/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

describe('Using FakerJS for randomData & handling Alerts', () => {
    
    before(() => {
        // Intercept the request to the home page and alias it as 'homePage'
        cy.intercept('https://demo.automationtesting.in/').as('homePage')
        cy.visit('https://demo.automationtesting.in/')
        // Wait for the intercepted request to complete
        cy.wait('@homePage') 

        // Handle any uncaught exceptions to prevent Cypress from failing the test
        Cypress.on('uncaught:exception', (err, runnable) => 
        {
            // returning false here prevents Cypress from
            // failing the test
            return false
        }) 
    })

    context('Creating Data with Faker & Fill Form', () => {
        
        before(() => {
            cy.get('button[type="button"][id="btn2"]').click()
            // Assertions to verify that we are on the correct page
            cy.url().should('include', 'Register')
            cy.get('h1').should('contain', 'Automation')
            /*
            Load the login credentials from the fixture file 'loginCredentials' 
            and store it as an alias 'lC' for use in tests
            */
            cy.fixture('loginCredentials').then((lC) => {
                cy.wrap(lC).as('lC')
            })
        })

        it('Fill Data', () => {
            // Create Random Data using Faker
            let firstName = faker.person.firstName('male'), // e.g., 'Muhammad'
            lastName = faker.person.lastName('male'), // e.g., 'Usama'
            contactNumber = faker.phone.number('+92 318 ### ####'), 
            emailAddress = faker.internet.email({firstName:firstName, lastName:lastName, provider:'testautomationuni.com'}),
            gender = faker.person.sexType(), 
            address = faker.location.streetAddress({useFullAddress:true}),
            skills = [
                'Adobe InDesign','Adobe Photoshop','Analytics', 'Android', 
                'APIs', 'Art Design', 'AutoCAD', 'C', 'C++', 'Java', 'Linux'
            ], 
            skill = faker.helpers.arrayElement(skills),
            countries = [
                'Australia', 'Bangladesh', 'Denmark', 'Hong Kong', 'India', 
                'Japan', 'Netherlands', 'New Zealand', 'South Africa'
            ],
            country = faker.helpers.arrayElement(countries), 
            // faker.location.country(), // e.g., 'Pakistan'
            hobbies = [
                'Cricket', 'Movies', 'Hockey'
            ], 
            hobby = faker.helpers.arrayElement(hobbies),
            DOB = faker.date.birthdate({ min: 1916, max: 2015, mode: 'year' }),
            birthdate = {
                day: DOB.getDate().toString(),
                month: DOB.toLocaleString('default', { month: 'long' }), // e.g., 'January',
                year: DOB.getFullYear().toString() 
            }

            // Filling firstName & lastName
            cy.get('div input[placeholder="First Name"][ng-model="FirstName"]').type(firstName)
                .should('have.value', firstName)
            cy.get('div input[placeholder="Last Name"][ng-model="LastName"]').type(lastName)
            .should('have.value', lastName)
    
            // Filling Address
            cy.get('div textarea[ng-model="Adress"]').type(address)
                .should('have.value', address)

            // Filling emailAddress
            cy.get('div input[ng-model="EmailAdress"]').type(emailAddress)
                .should('have.value', emailAddress)
            
            // Filling phoneNumber
            cy.get('div input[ng-model="Phone"]').type(contactNumber)
                .should('have.value', contactNumber)

            // Adding File
            cy.get('input#imagesrc').selectFile('cypress/fixtures/outputAttachment.png')
            // cy.get('.file-footer-caption').should('contain', 'outputAttachment')

            // Selecting Gender
            cy.get('label input[type="radio"]').each($element => {
                // Check if the element has a value attribute
                cy.wrap($element).invoke('val').then(value => {
                    if (value.toLowerCase() == gender) {
                        // Perform actions if the value exists
                        cy.log(`Radio button value: ${value}`)
                        cy.wrap($element).check()
                            .should('be.checked')
                            .and('have.class', 'ng-valid-parse')
                    }
                })
            })

            // Selecting Hobby
            cy.contains('label', hobby).parent().find('input[type="checkbox"]').check()
                .should('be.checked')
            // Alternative
            // cy.get('div input[type="checkbox"]').each($element => {
            //     // Check if the element has a value attribute
            //     cy.wrap($element).invoke('val').then(value => {
            //         if (value == hobby) {
            //             // Perform actions if the value exists
            //             cy.log(`Radio button value: ${value}`)
            //             cy.wrap($element).parent().find('input').click()
            //                 // .should('have.class', 'ng-valid-parse')
            //         }
            //     })
            // })

            // Selecting Skill
            cy.get('select[ng-model="Skill"]').select(skill)
                .should('have.value', skill)

            // Selecting Country
            cy.get('span[aria-labelledby="select2-country-container"]').click()
            cy.contains('ul#select2-country-results li', country).click()

            // Selecting DOB
            cy.get('select[ng-model="yearbox"]').select(birthdate.year)
                .should('have.value', birthdate.year)
            cy.get('select[ng-model="monthbox"]').select(birthdate.month)
                .should('have.value', birthdate.month)
            cy.get('select[ng-model="daybox"]').select(birthdate.day)
                .should('have.value', birthdate.day)

            // Filling Password 
            cy.get('@lC').then((lC) => {
                cy.get('div input[ng-model="Password"]').type(lC.password)
                    .should('have.value', lC.password)
                cy.get('div input[ng-model="CPassword"]').type(lC.password)
                    .should('have.value', lC.password)
            })
        })

    }) // End Context 'Creating Data with Faker & Fill Form' Block

    context('Handling Alerts', () => {

        before(() => {
            // Click the link to navigate to the section with the alert box
            cy.contains('SwitchTo').click()
            cy.contains('Alerts').click()
            // Assertions
            cy.url().should('include', 'Alerts')
            cy.get('h1').should('contain', 'Automation')
        })

        // Test case for handling a simple alert box
        it('Window:Alert', () => {
            // Click the button that triggers the alert box
            cy.get('div#OKTab button').click()           
            // Listen for the alert event and verify its text content
            cy.on('window:alert', (str) => {
                // Assert that the alert text is as expected
                expect(str).to.equal('I am an alert box!')
            })
        })

        // Test case for handling a confirmation box
        it('Window:Confirm', () => {
            // Click the link to navigate to the section with the confirmation box
            cy.get('ul li a').contains('Alert with OK & Cancel ').click()
            // Click the button that triggers the confirmation box
            cy.get('div#CancelTab button').contains('click the button to display a confirm box ').click()
            // Listen for the confirm event and verify its text content
            cy.on('window:confirm', (str) => {
                // Assert that the confirm text is as expected
                expect(str).to.equal('Press a Button !')
                // Return false to simulate pressing the 'Cancel' button
                return false
            })
            // Verify that the correct message is displayed after pressing 'Cancel'
            cy.get('#demo').should('contain', 'You Pressed Cancel')
        })

        // Test case for handling a prompt box with a textbox
        it('Window:promptBox', () => {
            // Click the link that contains the text 'Alert with Textbox ' to trigger the prompt action
            cy.get('ul li a').contains('Alert with Textbox ').click()
            // Define the text to be entered in the prompt
            const name = 'Kashif'
            /*
            cy.window().then((win) => { cy.stub(win, 'prompt').returns(name) }) accesses the window object of the application, stubs the window.prompt method, and sets it up to return the name when called. This simulates the user entering 'Kashif' into the prompt dialog. 
            */
            cy.window().then((win) => {
                cy.stub(win, 'prompt').returns(name)
            })
            // Click the button that triggers the prompt dialog
            cy.get('div#Textbox button')
                .contains('click the button to demonstrate the prompt box ')
                .click()
            // Assert that the element with id 'demo1' contains the text 'Kashif'
            cy.get('#demo1').should('contain', name)
        })
        
    }) // End Context 'Handling Alerts' Block

}) // End Describe Block