/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Details/summary polyfill from frontend toolkit
  GOVUK.details.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()

  // Table search
  if(document.getElementById('searchReducer')) {
    document.getElementById('searchReducer').addEventListener('change', findMatchingRows);
    document.getElementById('searchReducer').addEventListener('keyup', findMatchingRows);
    document.querySelectorAll('.table-click-helper').forEach(function(section) {
        section.addEventListener('click', clickTableCheckbox);
    });
  }

  function findMatchingRows() {
    var regex = new RegExp(this.value, 'gi');
    document.querySelectorAll('#searchableTable tr').forEach(function(tableRow) {
        tableRow.classList.add('js-hidden');
        if(tableRow.dataset.search.match(regex)) {
            tableRow.classList.remove('js-hidden');
        }
    });
  }

  function findSelectedMatches() {
      var self = this;
      document.querySelectorAll('#searchableTable tr').forEach(function(tableRow) {
          tableRow.classList.add('js-hidden');
          if(self.value === 'noFilter') {
              tableRow.classList.remove('js-hidden');
          } else if(tableRow.dataset.role.match(self.value)) {
              tableRow.classList.remove('js-hidden');
          }
      });
  }

  function clickTableCheckbox() {
      document.getElementById(this.dataset.checkbox).click();
  }

})
