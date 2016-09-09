print(wifi.sta.getip())
wifi.setmode(wifi.STATION)
wifi.sta.config("ACM Internal 2","acmForTheWin2")
wifi.sta.connect()
tmr.alarm(1, 1000, 1, function()
	if wifi.sta.getip() == nil then
		print("Connecting...")
	else
		tmr.stop(1)
		print("Connected, IP is ")
		print(wifi.sta.getip())
	end
end)

switch_pin = 1  
gpio.mode(switch_pin,gpio.OUTPUT)
gpio.write(switch_pin, gpio.LOW)

function open()
    gpio.write(switch_pin,gpio.HIGH)
    tmr.delay(1000000)
    gpio.write(switch_pin,gpio.LOW)
end

srv=net.createServer(net.TCP) 
srv:listen(8080,function(conn) 
    conn:on("receive",function(conn,payload) 
    print(payload) 
    open()
    conn:send("HTTP/1.0 200 OK\r\nContent-Type:text/html\r\n\r\n<h1>ok</h1>")
    conn:close()
    end) 
end)
          