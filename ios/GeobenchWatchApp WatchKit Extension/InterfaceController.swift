//
//  InterfaceController.swift
//  GeobenchWatchApp WatchKit Extension
//
//  Created by Milan Camus on 28/09/2021.
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {
  
  @IBOutlet weak var mapView: WKInterfaceMap!

    override func awake(withContext context: Any?) {
        // Configure interface objects here.
      mapView.setShowsUserLocation(true)
    }
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
    }

  
}

