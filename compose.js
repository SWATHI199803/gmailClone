
var clientId = '506369891549-0hvkokhen4mjpsasu8u2iqukfhnp20i1.apps.googleusercontent.com';
var apiKey = 'AIzaSyAVtWMVJwy3kvP1c07TA5fD0n-j-m97LWM';
var scopes ='https://www.googleapis.com/auth/gmail.readonly '+'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

//enable compose button

function handleAuthResult(authResult) {
  if(authResult && !authResult.error) {
    $('#authorize-button').remove();
    $('#compose-button').removeClass("hidden");
  } else {
    $('#authorize-button').removeClass("hidden");
    $('#authorize-button').on('click', function(){
      handleAuthClick();
    });
  }
}

// sending composing email function

function sendEmail()
{
  $('#send-button').addClass('disabled');

  sendMessage(
    {
      'To': $('#compose-to').val(),
      'Subject': $('#compose-subject').val()
    },
    $('#compose-message').val(),
    composeTidy
  );

  return false;
}

// compose e mail function

function composeTidy()
{
  $('#compose-modal').modal('hide');

  $('#compose-to').val('');
  $('#compose-subject').val('');
  $('#compose-message').val('');

  $('#send-button').removeClass('disabled');
}


// send message
function sendMessage(headers_obj, message, callback)
{
  var email = '';

  for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";

  email += "\r\n" + message;

  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });

  return sendRequest.execute(callback);
}






