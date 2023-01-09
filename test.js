const webdriver = require('selenium-webdriver');
const firefox    = require('selenium-webdriver/firefox');
const { By } = require('selenium-webdriver');

const test = async () => {
	const driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
	console.log('Loading Webpage');
	await driver.get(`http://localhost:3000`);
    
    console.log("1) Testing If app loads");
        const title = await driver.getTitle()
        console.log(title == "CRUD Application");
  
    console.log('2) Open Add user form')
        await driver.findElement(By.css(".addUserBtn")).click();    
        const isFormPage = await driver.findElement(By.css(".addNewUserHeading")).isDisplayed();
        console.log(isFormPage);

    console.log('2) Save New User')
        await driver.findElement(By.css("#userName")).sendKeys("FAIQ SHAHZAD");
        await driver.findElement(By.css("#userEmail")).sendKeys("faiq@mail.com");
        await driver.findElement(By.css("#saveUser")).click();
        const alertText = await driver.switchTo().alert().getText();
        // let added_tasksUpdated = await driver.findElements(By.css(".added-tasks"))
        console.log(alertText == "Data Inserted Successfully!");
        await driver.switchTo().alert().accept();

    console.log('3) Return Back')
        await driver.findElement(By.css(".backBtn")).click();
        const listUsers = await driver.findElements(By.css(".usersList"))
        console.log(listUsers.length > 0);

    console.log('4) Check User is Added')
        const listUserNames = await driver.findElements(By.css(".addedUserName"))
        console.log(await listUserNames[listUserNames.length -1].getText() == "FAIQ SHAHZAD");

    console.log('5) Delete User')
        const deleteBtns = await driver.findElements(By.css(".deleteBtn"))
        await deleteBtns[deleteBtns.length -1].click()
        const detekeAlertText = await driver.switchTo().alert().getText();
        console.log(detekeAlertText == "Do you really want to delete this record?");
        await driver.switchTo().alert().accept();

        driver.quit();

}
test();