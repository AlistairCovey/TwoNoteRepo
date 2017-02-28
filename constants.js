var APP_CLIENT_ID = "fc8218cd-5294-4e4c-9fbe-b56a59340355";
var REDIRECT_URL = "http://localhost/TwoNote/";

WL.Event.subscribe("auth.login", onLogin);
            WL.init({
                client_id: APP_CLIENT_ID,
                redirect_uri: REDIRECT_URL,
                scope: "wl.signin office.onenote_update",
                response_type: "token"
            });
            WL.ui({
                name: "signin",
                element: "signin"
			
            });
            function onLogin (session) {
                if (!session.error) {
					document.getElementById("nav").style.display = "block";
					$('#dialog').dialog('close');
					$.ajax({
					url:"https://www.onenote.com/api/v1.0/me/notes/pages",
					type: "GET",
					beforeSend: function(xhr){
						xhr.setRequestHeader('Authorization', 'Bearer ' + session.session.access_token);
					},
					success: function(data) {
						var list = $('#list');
						if (data.value != null){
							for (var i = 0; i< data.value.length; i++){
								list.append('<li class="listItem" onclick="viewContent(\''+ data.value[i].id + '\');">' + data.value[i].title + '</li>')
								
							}
						}
					}
					});
                    WL.api({
                        path: "me",
                        method: "GET"
                    }).then(
                        function (response) {
                            document.getElementById("info").innerText =
                                "Hello, " + response.first_name + " " + response.last_name + "!";
                        },
                        function (responseFailed) {
                            document.getElementById("info").innerText =
                                "Error calling API: " + responseFailed.error.message;
                        }
                    );
                }
                else {
                    document.getElementById("info").innerText =
                        "Error signing in: " + session.error_description;
                }
				
				
				
			}
			$(document).ready(function(){	
				$("#menu").click(function() {
					$("#menu").menu();
				});	
			});	
				

			
			
			
			
			
			
			
		
			
			
			
			
			
			
			
			
			