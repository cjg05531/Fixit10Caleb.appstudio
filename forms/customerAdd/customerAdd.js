
customerAdd.onshow=function(){
  txtRemaining_contents.style.height = "100px"
}

btnAdd.onclick=function(){
  query = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('Jesse Antiques','1113 F St','Omaha','NE','68178')"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

  
  query = `SELECT name from customer`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=cjg05531&pass=" + pw + "&database=cjg05531&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
  } else {
    // transit error
    console.log(`Error: ${req.status}`);
  }
  
  lblAdded.value = `Your customer was added!`
  
  let customersAdd = ""
  for (i = 0; i <= results.length - 1; i++)
    customersAdd = customersAdd + results[i] + "\n"

  txtRemaining.value = customersAdd

}



