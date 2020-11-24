"use strict"; // Start of use strict

var App = function() {

    var _initSideBar = function() {
        $(document).ready(function() {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

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