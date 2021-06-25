
const {Builder, By, Key, until} = require('..');

var customer = '503107718';

var driver = new Builder()
    .forBrowser('chrome')
    .build();
// debugger;
//log in page. 输入DEC/110/EN网址。其实用户名也可以放到url里面，&sap-user=qinji1
// var nextStep = driver.get('http://usstpaul7030d.ecolab.com:8001/sap(bD1lbiZjPTExMCZkPW1pbg==)/bc/bsp/sap/crm_ui_start/default.htm'
//  + '?sap-client=110&sap-language=EN') 
//QC3

const actions = driver.actions();

var nextStep = driver.get('http://ebscrmdbq3.ecolab.com:8001/sap/bc/bsp/sap/crm_ui_start/default.htm?sap-client=400&sap-sessioncmd=open&SAP-LANGUAGE=EN') 

    //CSS是有正则表达式 surfix id='sap-user'
    .then(_ => driver.findElement(By.css("input[id$='p-user']")).sendKeys('qinji1'))
//需要注意下，这里sendKeys 做了两件事情，先输入值，在press return键。
//return是apple的键，一般可以认为与enter类似. refer to https://en.wikipedia.org/wiki/Enter_key
    //CSS是有正则表达式 prefix id='sap-password'
    .then(_ => driver.findElement(By.css("input[id^='sap-passw']")).sendKeys('ecoChina02', Key.RETURN)) 
//不需要再去press登录按钮
    //.then(_ => driver.click(findElement(By.id('LOGON_BUTTON'))))
//role selection page.选择登录的role
	.then(_ => driver.wait(until.titleIs('Select a business role: - [SAP]'), 5000))
	.then(_ => driver.wait(until.elementLocated(By.id('ZEBS_ICAGENT'), 5000)))
    //CSS是有正则表达式 substring id = 'ZEBS_ICAGENT'
    .then(_ => driver.findElement(By.css("[id*='EBS_ICAGENT']")).click() )
    .catch(error => { 
        console.log(error);
        console.log("...........refreshing......");
        driver.navigate().refresh()
        // .then(_ => drive.navigate().refresh())
        .then(_ => driver.wait(until.elementLocated(By.id('ZEBS_ICAGENT'), 5000)))
        .then(_ => driver.findElement(By.css("[id*='EBS_ICAGENT']")).click())
        .then(_ => console.log("........refreshed.........."))
        ;
    })
    //not working in firefox: ElementNotInteractableError: Element could not be scrolled into view
    //so run script
    // .then(_ => driver.executeScript(
    //     'document.getElementById("ZEBS_ICAGENT").click();'
    //     ))   

//identify account page    
    // .then(_ => driver.refresh())
    .then(_ => driver.wait(until.titleIs('Identify Account - [Interaction Center ]'), 10000))
    //死循环。。。NND
    // .then(_ => driver.wait(until.elementLocated(By.css(id$='zzfragmentsearch'), 5000,'time out on customer!')))
    // .then(_=> console.log('Element found?'))
//customer number
	// .then(_ => driver.findElement({id: "C3_W18_V19_V21_searchcustomer_struct\.zzfragmentsearch"})
	// .then(_ => driver.findElement(By.xpath('//input[starts-with(@id, "C3_W18_V19_V21_searchcustomer_struct")]'))
    // .then(_ => driver.findElement(By.css('input[id="C3_W18_V19_V21_searchcustomer_struct\.zzfragmentsearch"]'))
//现在感觉是因为在查找的时候element还没有加载到,试试等5秒
    //不让这里timeout，用settimeout
    .then(_ => {
        new Promise(function (resolve, reject) {
            setTimeout(_ => console.log('let\'s wait for 5 seconds!'),5000);
        })
    } )

    // .catch(error => {console.log('wait for 5 sec');console.log(error)})
//另外，CSS是有正则表达式的
    .then(_ => console.log("........re-roading DOM.........."))    
    .then(_ => driver.findElement(By.css("[id*='EBS_ICAGENT']")).sendKeys(Key.chord("CONTROL", "SHIFT", "I")))
    .then(_ => console.log("........DOM re loaded.........."))    
    
    .then(_ => driver.executeScript(
        'console.log(document.getElementById("C3_W18_V19_V21_searchcustomer_struct.zzfragmentsearch"));'
        ))
    .catch(error => { 
        console.log("new error:");
        console.log(error);        
        driver
        // .then(_ => driver.findElement(By.css("[id*='EBS_ICAGENT']")).Key.chord("CONTROL", "SHIFT", "I"))
        .then(_ => console.log("........refreshed.........."))
        .catch(error => { 
            console.log("error on sending keys.....");
            console.log(error);
        })
    })
// 实在找不到，回头用 document.getElementById 试试。
    
	   // .sendKeys("503107718"), Key.RETURN )
    // .then(_ => driver.findElements(By.css("#C3_W18_V19_V21_searchcustomer_struct\.zzfragmentsearch"))
    //     .then(found => console.log('Element found? %s', !!found.length), error => console.log('filed not found:' 
    //         + error))
    //     )

    // .then( getCustomerField())

    .catch(error => console.log(error))
    // .then(_ => {
    //     document.getElementById("C3_W18_V19_V21_searchcustomer_struct.zzfragmentsearch").value = customer;
    //     return customer;
    // })
    .catch(error => console.log(error))
    ;

    nextStep
    // .then(_ => driver.findElement(By.css("input[id*='zzfragmentsearch']")).sendKeys("503107718", Key.RETURN ))
    .then(_ => console.log('after search'))
    .catch(error => console.log(error));

// .then(_ => driver.quit());
// function getCustomerField(_) {
//     var CustomerField = driver.findElements(By.css('input[id="C3_W18_V19_V21_searchcustomer_struct\.zzfragmentsearch"]'));
//     var logText = CustomerField.then(found => console.log('Element found? %s', !!found.length));
//     console.log("getCustomerField");
//     return 'ok';
// }

//*[@id="C3_W18_V19_V21_searchcustomer_struct.zzfragmentsearch"]

// doSomethingCritical()
// .then(result => doSomethindOptional()
//   .then(optionalResult => doSomethingExtraNice(optionalResult))
//   .catch(e => {})) // Ignore if optional stuff fails; proceed.
// .then(() => moreCriticalStuff())
// .catch(e => console.log("Critical failure: " + e.message));

//*[@id="C6_W29_V30_ZEBS_CZSOR"]

// <a id="C6_W29_V30_ZEBS_CZSOR" class="th-lk" href="javascript:void(0)" onclick="htmlbSubmitLib('htmlb',this,'thtmlb:link:click:0','myFormId','C6_W29_V30_ZEBS_CZSOR','ZEBSWCZSOR',0);return false" title="Create ZSOR" onfocus="thSaveKbFocus(this);" oncontextmenu="return false;">Create ZSOR</a>

// function count5(counter = 0) {
//     counter = counter + 1;
//     setTimeout(_ => { console.log("wait for 5 " + "sec");
//                     return counter;
//                     },5000); 
//     }

    // 在chorme下，不操作DOM，就get不到element！！！
    //document还是前面网页的document，没有刷新，应该是网页报错，阻止了dom的更新，或者是chrome的bug？？

