var ttss;
$.post("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/CruciverbaItalianoPHP/getParoleCruciverbaItaliano.php",{}, function(data){
        result = data;
    }).done(function () {
        ttss = result;
        ttss = JSON.parse(ttss).parole;
		startttsgame();
		activatetts();
		initvkeyboard();
		$("#crossword").css({ "width" : ($("tbody:eq(0)").find("tr:eq(0)").find("td").length * 32) + "px" });
		$("#game").show();
    });