import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Secondpage.dart';
import 'package:http/http.dart';
import 'dart:convert';
import 'dart:async';

Future<String> getReports() async {
  Uri url = Uri.parse('https://aubon.platform-spanning.systems/get-reports');
  Response response = await get(url);
  return response.body;
}

class MapWidget extends StatefulWidget {
  const MapWidget({Key? key}) : super(key: key);
  @override
  _MapWidgetState createState() => _MapWidgetState();
}

class _MapWidgetState extends State<MapWidget> {
  List<Marker> markers = [];
  static var token = dotenv.env['token'];
  static var mapUrl =
      "https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=" +
          token!;
  Timer? timer;

  String getIconName(int rating) {
    switch (rating) {
      case 0:
        return 'reporticon0';
      case 1:
        return 'reporticon1';
      case 2:
        return 'reporticon2';
      case 3:
        return 'reporticon3';
      case 4:
        return 'reporticon4';
      case 5:
        return 'reporticon5';
      default:
        return 'reporticon0';
    }
  }

  void displayReportMarkers() {
    getReports().then((reports) {
      dynamic reportsJson = jsonDecode(reports);

      List<Marker> newMarkers = [];
      for (var report in reportsJson) {
        Marker marker = Marker(
            width: 30.0,
            height: 30.0,
            point: LatLng(double.parse(report["latitude"]),
                double.parse(report["longitude"])),
            builder: (ctx) => Image.asset(
                "images/" + getIconName(report['rating']) + ".png"));
        newMarkers.add(marker);
      }
      setState(() {
        markers = newMarkers;
      });
    });
  }

  @override
  void initState() {
    super.initState();
    displayReportMarkers();
    timer = Timer.periodic(
        Duration(seconds: 1), (Timer t) => displayReportMarkers());

    @override
    void dispose() {
      timer?.cancel();
      super.dispose();
    }
  }

  @override
  Widget build(BuildContext context) {
    return FlutterMap(
        options: MapOptions(
            center: LatLng(59.86, 17.63), maxZoom: 16.0, minZoom: 3, zoom: 8),
        layers: [
          TileLayerOptions(urlTemplate: mapUrl, subdomains: ['a', 'b', 'c']),
          MarkerLayerOptions(markers: markers),
          OverlayImageLayerOptions(
            overlayImages: [
              OverlayImage(
                bounds: LatLngBounds(LatLng(90, -180), LatLng(-90, 180)),
                imageProvider: NetworkImage(dotenv.env['auroraImageUrl'] ?? ""),
                opacity: 0.7,
              )
            ],
          )
        ]);
  }
}

Future<void> main() async {
  await dotenv.load(fileName: "environment.env");
  getReports();
  runApp(MaterialApp(home: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aubon',
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Aubon'),
          ),
          body: Stack(children: <Widget>[
            MapWidget(),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.all(28.0),
                child: ElevatedButton(
                  child: const Text('Rate the Northern Lights'),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const SecondPage()),
                    );
                  },
                ),
              ),
            ),
          ])),
    );
  }

  showAlertDialog(BuildContext context) {
    // set up the buttons
    Widget cancelButton = FlatButton(
      child: Text("No"),
      onPressed: () {
        int value = 0;
        print("Value return :" + value.toString());
        Navigator.pop(context);
      },
    );
    Widget continueButton = FlatButton(
      child: Text("Yes"),
      onPressed: () {
        Navigator.pop(context);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => SecondPage()),
        );
      },
    );
    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: Text("Confirmation"),
      content: Text("Have you seen the Northern Lights"),
      actions: [
        cancelButton,
        continueButton,
      ],
    );
    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }
}
