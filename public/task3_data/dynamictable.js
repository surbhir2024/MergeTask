function myFunction() {
  table =document.getElementById('tableid');
  var row = table.rows.length;
  var cell = table.rows[row-1].cells.length;
   var insertrow = table.insertRow(-1);

   for(var i=0;i<cell;i++)
   {
      insertrow.insertCell(i);
   }
  }
  function removeRow() {
      table =document.getElementById('tableid');
      var row = table.rows.length;
      if(row>2){
          if(confirm("Are you Sure"))
          {
              table.deleteRow(row-1);  
          }

      }
  }
  
function AddColumn(){
  table =document.getElementById('tableid');
  var row = table.rows.length;
  var cell = table.rows[row-1].cells.length;
  var rows = document.getElementsByTagName('tr');
  for(var i=0;i<rows.length;i++)
  {
      rows[i].insertCell(-1);
  }
}

function RemoveColumn(){
  table =document.getElementById('tableid');
  var row = table.rows.length;
  var cell = table.rows[row-1].cells.length;
  var rows = document.getElementsByTagName('tr');
  if(rows[0].cells.length>2){
      for(var i=0;i<rows.length;i++)
      {
          rows[i].deleteCell(-1);
      }   
  }
  
}
