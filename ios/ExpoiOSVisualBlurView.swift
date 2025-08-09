import ExpoModulesCore
import SwiftUI

class ExpoVisualBlurViewProps: ExpoSwiftUI.ViewProps {
    @Field var tooltip: [String: Any] = [:]
    @Field var maxBlurRadius: Double = 20.0
    @Field var direction: String = "blurredTopClearBottom"
    @Field var startOffset: Double = 0.0
    
    var onActionPress = EventDispatcher()
    var onTipDismiss = EventDispatcher()
}

struct ExpoVisualBlurView: ExpoSwiftUIView, ExpoSwiftUI.WithHostingView {
    let props: ExpoVisualBlurViewProps
    
    var body: some View {
        ZStack {
            Children()
            
            VariableBlurView(
                maxBlurRadius: CGFloat(props.maxBlurRadius),
                direction: blurDirection,
                startOffset: CGFloat(props.startOffset)
            )
            .id("\(props.maxBlurRadius)-\(props.direction)-\(props.startOffset)")
        }
    }
    
    private var blurDirection: VariableBlurDirection {
        switch props.direction {
        case "blurredBottomClearTop":
            return .blurredBottomClearTop
        default:
            return .blurredTopClearBottom
        }
    }
}
