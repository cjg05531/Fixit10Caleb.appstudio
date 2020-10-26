

customerUpdate.onshow=function(){
  txtUpdate_contents.style.height = "100px"
   query = "SELECT * FROM customer"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

      if (req.status == 200) { //transit worked.
            results = JSON.parse(req.responseText)
            // names now in results array
            drpUpdate.clear()
            allCustomers = results
            for (i = 0; i <= results.length - 1; i++)
                drpUpdate.addItem(results[i][1])
            
    } else {        
        NSB.MsgBox(`Error: ${req.status}`)
    }  
}


let userChoice = ""
drpUpdate.onclick=function(s){
if (typeof(s) == "object")   
      return                    
    else {  // the user picked something
      drpUpdate.value = s 
      userChoice = s

    }
  
}

btnUpdate.onclick=function(){
  
  let newName = inpUpdate.value
  
    query = `UPDATE customer SET name = '${newName}' WHERE name = '${userChoice}'`

    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

    if (req.status == 200) { //transit worked.
      if (req.responseText == 500) { 
       console.log(`You have successfully changed the customers name!`)
        // resets
        inpUpdate.value = ""
        drpUpdate.value = "Customer"
      } else
        console.log(`There was a problem changing the Customers name.`)
    } else
      // transit error
      console.log(`Error: ${req.status}`);
  
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
  }
 if (results.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers.")
  } else {
    
    let customersUpdate = ""
    for (i = 0; i <= results.length - 1; i++)
      customersUpdate = customersUpdate + results[i] + "\n"
    // change value of text area
    txtUpdate.value = customersUpdate
  }
  
}
