import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Secondpage.dart';

Future<void> main() async {
  await dotenv.load(fileName: "environment.env");
  runApp(MaterialApp(home: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  static var token = dotenv.env['token'];
  static var mapUrl =
      "https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=" +
          token!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aubon',
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Aubon'),
          ),
          body: Stack(children: <Widget>[
            FlutterMap(
              options: MapOptions(
                  center: LatLng(59.86, 17.63), maxZoom: 20.0, minZoom: 1.5),
              layers: [
                TileLayerOptions(
                    urlTemplate: mapUrl, subdomains: ['a', 'b', 'c']),
                MarkerLayerOptions(
                  markers: [
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.62),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon0.png"),
                      ),
                    ),
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.61),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon1.png"),
                      ),
                    ),
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.60),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon2.png"),
                      ),
                    ),
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.59),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon3.png"),
                      ),
                    ),
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.58),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon4.png"),
                      ),
                    ),
                    Marker(
                      width: 50.0,
                      height: 50.0,
                      point: LatLng(59.86, 17.57),
                      builder: (ctx) => Container(
                        child: Image.asset("images/reporticon5.png"),
                      ),
                    )
                  ],
                ),
                OverlayImageLayerOptions(
                  overlayImages: [
                    OverlayImage(
                      bounds: LatLngBounds(LatLng(90, -180), LatLng(-90, 180)),
                      imageProvider:
                          NetworkImage(dotenv.env['auroraImageUrl'] ?? ""),
                      opacity: 0.7,
                    )
                  ],
                )
              ],
            ),
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
