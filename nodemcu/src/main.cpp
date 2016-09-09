#include <ESP8266WiFi.h>
#include <ArduinoJson.h>


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
void getBody(String response);
String goldoon_get();


// Arduino initial entry point #1
void setup() {
    initSerial();
    initWiFi();
}


// Arduino loop point
void loop() {
    StaticJsonBuffer<2000> jsonBuffer;
    String json = goldoon_get();
    Serial.println(json);
    JsonArray& root = jsonBuffer.parseArray(json.c_str());

    if(!root.success()) {
        Serial.println("JSON parsing failed");
    }
    for (JsonArray::iterator it=root.begin(); it!=root.end(); ++it)
    {
        Serial.println(it->asObject()["_id"].as<char *>());
    }

    JsonObject& field = root[0];
    const char *id = field["_id"];
    Serial.println(String("ID:::::::::") + id);

    delay(5000);
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
    WiFiClient client;

    if(client.connect(serverAddress, port)) {
        String request = String("GET /goldoon HTTP/1.1\n ") +
            "Host: " + serverAddress + "\n Cache-Control: no-cache\n\n";
        client.print(request);
        char lastChar = 0;
        int contentLength = 0;
        while (client.connected())
        {
            if (client.available())
            {
                String str = client.readStringUntil('\n');
                if(str.startsWith("Content-Length")) {
                    contentLength = str.substring(16).toInt();
                }

                if(str.startsWith("\r") && str.endsWith("\r")) {
                    break;
                }
            }
        }

        String json = "";
        for(int i = 0; i < contentLength; i++) {
            json += (char) client.read();
        }


        client.stop();

        return json;
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
