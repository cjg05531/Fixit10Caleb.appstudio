

customerDelete.onshow=function(){
  txtCustomers1_contents.style.height = "100px"
   query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

      if (req.status == 200) { //transit worked.
            results = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown
            drpCustomers1.clear()
            allCustomers = results
            for (i = 0; i <= results.length - 1; i++)
                drpCustomers1.addItem(results[i][1])
            
    } else {        
        NSB.MsgBox(`Error: ${req.status}`)
    }  
}

drpCustomers1.onclick=function(s){
  if (typeof(s) == "object")   
      return                    
      else {
    drpCustomers1.value = s 
    let DeleteName = s
    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
      if (DeleteName == results[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
     txtCustomers1.value = `That customer is not in the database.${DeleteName} \n ${results}`
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = " + '"' + DeleteName + '"'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)
      
      if (req.status == 200) { //transit worked.
        if (req.responseText == 500) // means the insert succeeded
          console.log(`You have successfully deleted the customer named ${DeleteName}`)
        else
          console.log(`There was a problem deleting ${DeleteName} from the database.`)
      } else {
        // transit error
        console.log(`Error: ${req.status}`);
      }
    }
    // run the ajax to get the new list of customers
    query = `SELECT name from customer`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

    if (req.status == 200) { //transit worked.
      //
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      // transit error
      console.log(`Error: ${req.status}`);
    }
    
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"

    txtCustomers1.value = customersLeft
  }
}
