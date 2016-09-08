#include <ESP8266WiFi.h>
#include <string>

const char* ssid = "IP-WDL-RT2T2R";
const char* password = "Tabrizian1";

const char* host = "192.168.1.6";


void setup()
{
  Serial.begin(115200);
  Serial.println();

  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");
}


void loop()
{
  WiFiClient client;

  Serial.printf("\n[Connecting to %s ... ", host);
  if (client.connect(host, 3000))
  {
    Serial.println("connected]");

    Serial.println("[Sending a request]");
    char *request = "GET /goldoon HTTP/1.1\n Host: 192.168.1.6\n Cache-Control: no-cache\n\n";
    Serial.println(request);
    client.print(request);

    Serial.println("[Response:]");
    while (client.connected())
    {
      if (client.available())
      {
        String line = client.readStringUntil('\n');
        Serial.println(line);
      }
    }
    client.stop();
    Serial.println("\n[Disconnected]");
  }
  else
  {
    Serial.println("connection failed!]");
    client.stop();
  }
  delay(1000);
}
