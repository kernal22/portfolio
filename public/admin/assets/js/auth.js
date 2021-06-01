(function ($) {
    'use strict';
    $(function () {
        $(document).ready(function () {
            $("#loginBtn").click(function () {
                // validateLoginForm()
                const loginData = $('#loginForm').serialize();
                const method = $('#loginForm').attr('method');
                onLogin(loginData, method)
            });

            function onLogin(data, method) {

                $.ajax({
                    dataType: 'json',
                    type: method,
                    url: '/auth/login',
                    data: data,
                    success: function (data) {
                        if (data.status) {

                        } else {
                            $.toaster({ priority: 'danger', title: 'Error', message: data.message });
                        }
                    },
                    error: function (error) {

                    }
                })
            }

            function validateLoginForm() {
                $('form[id="loginForm"]').validate({
                    rules: {
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 6
                        }
                    },
                    messages: {
                        email: { required: 'Enter an email', email: 'Enter a valid email' },
                        password: 'Enter min 6 digit password'
                    },
                    submitHandler: function (e) {
                        alert()
                        const loginData = $('#loginForm').serialize();
                        const method = $('#loginForm').attr('method');
                        onLogin(loginData, method);
                    }
                });
            }
        });
    });
})(jQuery);