<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<link rel="stylesheet" href="./contact.css">
<meta charset="ISO-8859-1">
<title>Contact</title>
</head>
<%! String date=new java.text.SimpleDateFormat("yyyy").format(new java.util.Date());%>
<%! int ourPhone=(int) (Math.random() * 100000)+100000; %>
<%! String email = "contact@utalk.com"; %>
<%! String address = "Victory Square, Bucharest, Romania"; %>
<body>
<p id="contact-title">uTalk Contact</p>
<p>You can find us by: </p>
<p id="contact-email">eMail: <%=email %></p>
<p id="contact-tel">Telephone: +4 074 <%=ourPhone%></p>
<p id="contact-address">Headquarters: <%=address %></p>
<p id="contact-copyrights">All rights reserved. uTalk <%=date %></p>

</body>
</html>