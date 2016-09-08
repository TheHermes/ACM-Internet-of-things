#include <ESP8266WiFi.h>

const char* ssid = "IP-WDL-RT2T2R";
const char* password = "Tabrizian1";

const char* serverAddress = "192.168.1.6";
const int baudRate = 115200;
const int port = 3000;

WiFiClient client;

void reportHumidity(double amount);
bool goldoon_exists();
void goldoon_create();
void initSerial();
void initWiFi();
void getBody(String response);
String goldoon_get();


// Arduino initial entry point #1
void setup() {
    initSerial();
    initWiFi();
}


// Arduino loop point
void loop() {
    //double humidity = analogRead(A0);
    //Serial.println((humidity));

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

String goldoon_get() {
    if(connect.client(host, port)) {
        char *request = "GET /goldoon HTTP/1.1\n Host: 192.168.1.6\n Cache-Control: no-cache\n\n";
        client.print(request);
        while (client.connected())
        {
            if (client.available())
            {
                String line = client.readStringUntil('\n');
                Serial.println(line);
            }
        }
        client.stop();
    }
}

void getBody(String response) {
    //  while (client.connected())
    //  {
    //    if (client.available())
    //    {
    //      String line = client.readStringUntil('\n');
    //      Serial.println(line);
    //    }
    //  }
    //  client.stop();
}
