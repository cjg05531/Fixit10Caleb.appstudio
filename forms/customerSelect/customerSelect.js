
let req = ""
let query = ""
let results = ""
let pw = "Viks6523!" 
let allCustomers = []
let customerState = ""


customerSelect.onshow=function(){
    txtCustomers_contents.style.height = "100px"
   query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

      if (req.status == 200) { //transit worked.
            results = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown
            drpCustomers.clear()
            allCustomers = results
            for (i = 0; i <= results.length - 1; i++)
                drpCustomers.addItem(results[i][1])
            
    } else {        
        NSB.MsgBox(`Error: ${req.status}`)
    }  
}


drpCustomers.onclick=function(s){
if (typeof(s) == "object")   
      return                    
    else {  // the user picked something
      drpCustomers.value = s
      let message  = ""
      for (i = 0; i < allCustomers.length; i++)
        if (s == allCustomers[i][1])
          customerState = allCustomers[i][4]
      for (i = 0; i < allCustomers.length; i++)
        if (customerState == allCustomers[i][4])
          message = message + allCustomers[i][1] + "\n"
        txtCustomers.value = `The following customers are also  in ${customerState}: \n${message}`
    }
}



