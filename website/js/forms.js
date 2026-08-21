(function () {
  function setStatus(form, message, kind) {
    var status = form.querySelector('[data-status]');
    if (!status) return;
    status.textContent = message || '';
    status.classList.remove('is-success', 'is-error');
    if (kind) status.classList.add(kind === 'success' ? 'is-success' : 'is-error');
  }

  function handleSubmit(form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var endpoint = form.getAttribute('data-endpoint');
      var submitBtn = form.querySelector('[type="submit"]');
      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (value, key) {
        payload[key] = value;
      });

      if (submitBtn) submitBtn.disabled = true;
      setStatus(form, 'Sending…', null);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok && data.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            setStatus(form, form.getAttribute('data-success-message') || 'Done — thank you.', 'success');
            form.reset();
          } else {
            setStatus(form, (result.data && result.data.error) || 'Something went wrong. Please try again.', 'error');
          }
        })
        .catch(function () {
          setStatus(form, 'Network error — please try again.', 'error');
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  document.querySelectorAll('form[data-endpoint]').forEach(handleSubmit);
})();
