#include <ESP8266WiFi.h>

const char* ssid = "IP-WDL-RT2T2R";
const char* password = "Tabrizian1";

const char* serverAddress = "192.168.1.6";
const int baudRate = 115200;
const int port = 3000;

void reportHumidity(double amount);
bool goldoon_exists();
void goldoon_create();
void initSerial();
void initWiFi();


// Arduino initial entry point #1
void setup() {
    initSerial();
    initWiFi();

    // Get config of the Goldoon
    // TODO
}


// Arduino loop point
void loop() {
    double humidity = analogRead(A0);
    Serial.println((humidity));
    //WiFiClient client;

    //Serial.printf("\n[Connecting to %s ... ", host);
    //if (client.connect(host, 3000))
    //{
    //  Serial.println("connected]");

    //  Serial.println("[Sending a request]");
    //  char *request = "GET /goldoon HTTP/1.1\n Host: 192.168.1.6\n Cache-Control: no-cache\n\n";
    //  Serial.println(request);
    //  client.print(request);

    //  Serial.println("[Response:]");
    //  while (client.connected())
    //  {
    //    if (client.available())
    //    {
    //      String line = client.readStringUntil('\n');
    //      Serial.println(line);
    //    }
    //  }
    //  client.stop();
    //  Serial.println("\n[Disconnected]");
    //}
    //else
    //{
    //  Serial.println("connection failed!]");
    //  client.stop();
    //}
    //delay(1000);
}

void initSerial() {
    Serial.begin(baudRate);
    Serial.println();
}

void initWiFi() {
    // WiFi Connection Initiation
    Serial.printf("Connecting to %s ", ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" connected");

}

void goldoon_create() {
}

bool goldoon_exists() {
}
