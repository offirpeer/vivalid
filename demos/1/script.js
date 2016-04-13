  var addValidatorBuilder = vivalid.validatorRepo.addBuilder;
  var addCallback = vivalid.htmlInterface.addCallback;
  var initAll = vivalid.htmlInterface.initAll;

  function messageLog(message) {
    var log = document.getElementById('MessageLogs');
    log.innerHTML = log.innerHTML + '<br/>' + message;
  }

  addValidatorBuilder('exisitingUserBob', function(ValidationState, stateEnum, options) {

    return function(value, callback) {

      var msg = 'user bob exists';

      setTimeout(dummyServiceCall, 5000);

      return new ValidationState('', stateEnum.pending);

      function dummyServiceCall() {

        if (value.indexOf('bob') !== -1) {
          callback(new ValidationState(msg, stateEnum.invalid));
        } else {
          callback(new ValidationState('', stateEnum.valid));
        }


      }

    };
  });

  addCallback('onValidationSuccess', function() {
    messageLog('HOORAY!!!! input group is valid and form will submit');
  });

  addCallback('onValidationFailure', function(invalid, pending, valid) {
    messageLog('input group is invalid!: ' + invalid + ' invalid, ' + pending + ' pending, and ' + valid + ' valid ');
  });

  addCallback('pendingUiStart', function(inputElems, submitElems) {
    messageLog('pendingUiStart');
    inputElems.forEach(function(input) {
      input.disabled = true;
    });

    submitElems.forEach(function(submit) {
      submit.disabled = true;
    });

    this.style.backgroundColor = 'green';
  });

  addCallback('pendingUiStop', function(inputElems, submitElems) {
    messageLog('pendingUiStop');
    inputElems.forEach(function(input) {
      input.disabled = false;
    });

    submitElems.forEach(function(submit) {
      submit.disabled = false;
    });

    this.style.backgroundColor = 'blue';
  });

  addCallback('onInputValidationResult', function(el, validationsResult, validatorName, stateEnum) {

    var msgEl = el.parentNode.querySelector('.js-message');
    var displayEl = msgEl;

    if (validationsResult.stateEnum === stateEnum.invalid) {
      displayEl.style.display = 'block';
      msgEl.innerHTML = validationsResult.message;
    } else {
      displayEl.style.display = 'none';
      msgEl.innerHTML = '';
    }

  });

  initAll();