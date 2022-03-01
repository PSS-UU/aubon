import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import 'Secondpage.dart';

void main() {
  runApp(MaterialApp(home: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  static const token =
      "pk.eyJ1IjoiYWxiaW5hbnR0aSIsImEiOiJja2p1ZHEwcGU4aWRnMnlsZ3Rsbm50Yzc1In0.CrAYg00ejOQY8mz7KnO39w";
  static const mapUrl =
      "https://api.mapbox.com/styles/v1/albinantti/ckzh3jx4r009q14l8eb32614u/tiles/{z}/{x}/{y}?access_token=" +
          token;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: Stack(
          children: [
            FlutterMap(
              options: MapOptions(center: LatLng(59.86, 17.63), minZoom: 10.0),
              layers: [
                TileLayerOptions(
                    urlTemplate: mapUrl, subdomains: ['a', 'b', 'c'])
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
                      new MaterialPageRoute(
                          builder: (context) => new SecondPage()),
                    );
                  },
                ),
              ),
            ),
          ],
        ));
  }
}
