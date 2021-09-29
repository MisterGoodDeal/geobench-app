//
//  AddBenchController.swift
//  GeobenchWatchApp WatchKit Extension
//
//  Created by Milan Camus on 29/09/2021.
//
import WatchKit
import Foundation

class AddBenchController: WKInterfaceController {
  
  var rating: Float = 0.0;
  var comment: NSString = "";
  
  var itemLocation: [(String, String)] = [
          ("1", "Street"),
          ("2", "Park"),
          ("3", "Forest"),
          ("4", "Public place"),
          ("5", "Resting area"),
          ("6", "Sea side"),
          ("7", "Parking"),
          ("8", "Other")]
  
  var itemEnvironment: [(String, String)] = [
          ("1", "Calm"),
          ("2", "Low noise"),
          ("3", "Noisy")]
  
  
  @IBOutlet weak var locationPicker: WKInterfacePicker!
  @IBOutlet weak var environmentPicker: WKInterfacePicker!
  
  override func awake(withContext context: Any?) {
      // Configure interface objects here.
    let pickerItemsLocation: [WKPickerItem] = itemLocation.map {
            let pickerItem = WKPickerItem()
            pickerItem.caption = $0.0
            pickerItem.title = $0.1
            return pickerItem
        }
    let pickerItemsEnvironment: [WKPickerItem] = itemEnvironment.map {
            let pickerItem = WKPickerItem()
            pickerItem.caption = $0.0
            pickerItem.title = $0.1
            return pickerItem
        }
    
    locationPicker.setItems(pickerItemsLocation);
    environmentPicker.setItems(pickerItemsEnvironment);
  }
  
  override func willActivate() {
      // This method is called when watch view controller is about to be visible to user
  }
  
  override func didDeactivate() {
      // This method is called when watch view controller is no longer visible
  }
  
  // Get the value of the bench rating
  @IBAction func getRatingValue(_ value: Float) {
    rating = value;
  }
  
  // Get the location index
  @IBAction func getLocation(_ value: Int) {
  }
  
  @IBAction func getEnvironment(_ value: Int) {
  }
  
  // Get the value of the comment
  @IBAction func getCommentValue(_ value: NSString?) {
    comment = value!;
  }
  
  // Send informations about the new bench to the iPhone
  @IBAction func addBench() {
    
  }
  
  
}
