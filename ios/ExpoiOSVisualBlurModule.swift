import ExpoModulesCore

public class ExpoiOSVisualBlurModule: Module {
  
  public func definition() -> ModuleDefinition {
    
    Name("ExpoiOSVisualBlur")

      View(ExpoVisualBlurView.self)
  }
}
