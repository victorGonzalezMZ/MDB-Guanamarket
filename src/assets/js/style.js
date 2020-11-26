"use strict"; // Start of use strict

var App = function() {

    var _initSideBar = function() {
        $(document).ready(function() {
            $('#sidebarCollapse').on('click', function() {
                $('#sidebar').toggleClass('active');
            });
        });
    };

    return {
        init: function() {
            _initSideBar();
        }
    }
}();