function sendSMS(frm, num, msg) {
  console.log("Attempt to sendSMS.");
  console.log(frm, num, msg);
  var req = new XMLHttpRequest();
  req.open('GET', "http://antonioasaro.site50.net/sms_2.0.php?cmd=test&frm="+frm+"&num="+num+"&msg="+msg, true); 
  req.onload = function(e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log("Success.");
      } else {
        console.log("Error.");
      }
    }
  }
  req.send(null);
}	

Pebble.addEventListener('ready', function(e) {
	console.log("JavaScript app ready and running!");
});

Pebble.addEventListener('appmessage', function(e) {
	console.log("Appmessage received.");
    console.log(JSON.stringify(e.payload));

	action = e.payload.cmd;
  	if (typeof(action) != 'undefined') {
		if (action == 'cfg') {
    		var settings = localStorage.getItem('SMS');
    		if (typeof(settings) == 'string') {
	      		try {
					console.log("GetItem settings.");
 	       			Pebble.sendAppMessage(JSON.parse(settings));
 	     		} catch (e) {
  	    		}
			}
		} else {
			sendSMS(e.payload.frm, e.payload.num, e.payload.msg);
		}
    }
});

Pebble.addEventListener('showConfiguration', function(e) {
    console.log("Showing configuration window.");
	Pebble.openURL('http://antonioasaro.site50.net/sms_2.0.html');
});

Pebble.addEventListener('webviewclosed', function(e) {
    console.log("Configuration window returned.");
    console.log(e.response);
	Pebble.sendAppMessage(JSON.parse(e.response));
    localStorage.setItem('SMS', e.response);
});