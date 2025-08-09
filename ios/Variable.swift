//
//  Variable.swift
//  Pods
//
//  Created by rit3zh CX on 8/9/25.
//

import SwiftUI
import UIKit
import CoreImage.CIFilterBuiltins
import QuartzCore


public enum VariableBlurDirection {
    case blurredTopClearBottom
    case blurredBottomClearTop
}


public struct VariableBlurView: UIViewRepresentable {
    
    public var maxBlurRadius: CGFloat = 20
    public var direction: VariableBlurDirection = .blurredTopClearBottom
    public var startOffset: CGFloat = 0
    
    public init(maxBlurRadius: CGFloat = 20, direction: VariableBlurDirection = .blurredTopClearBottom, startOffset: CGFloat = 0) {
        self.maxBlurRadius = maxBlurRadius
        self.direction = direction
        self.startOffset = startOffset
    }
    
    public func makeUIView(context: Context) -> VariableBlurUIView {
        let view = VariableBlurUIView()
        view.configure(maxBlurRadius: maxBlurRadius, direction: direction, startOffset: startOffset)
        return view
    }

    public func updateUIView(_ uiView: VariableBlurUIView, context: Context) {
        // Update the blur when props change
        uiView.updateBlur(maxBlurRadius: maxBlurRadius, direction: direction, startOffset: startOffset)
    }
}

/// Enhanced VariableBlurUIView with dynamic updates
open class VariableBlurUIView: UIVisualEffectView {
    
    private var variableBlur: NSObject?
    private var backdropLayer: CALayer?
    private var currentMaxBlurRadius: CGFloat = 0
    private var currentDirection: VariableBlurDirection = .blurredTopClearBottom
    private var currentStartOffset: CGFloat = 0
    
    override public init(effect: UIVisualEffect?) {
        super.init(effect: UIBlurEffect(style: .regular))
        setupInitialState()
    }
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
        setupInitialState()
    }
    
    private func setupInitialState() {
        // Get rid of the visual effect view's dimming/tint view
        for subview in subviews.dropFirst() {
            subview.alpha = 0
        }
        
        // Cache the backdrop layer
        backdropLayer = subviews.first?.layer
    }
    
    public func configure(maxBlurRadius: CGFloat, direction: VariableBlurDirection, startOffset: CGFloat) {
        setupVariableBlur(maxBlurRadius: maxBlurRadius, direction: direction, startOffset: startOffset)
    }
    
    public func updateBlur(maxBlurRadius: CGFloat, direction: VariableBlurDirection, startOffset: CGFloat) {
        // Only update if values have actually changed
        guard maxBlurRadius != currentMaxBlurRadius ||
              direction != currentDirection ||
              startOffset != currentStartOffset else {
            return
        }
        
        setupVariableBlur(maxBlurRadius: maxBlurRadius, direction: direction, startOffset: startOffset)
    }
    
    private func setupVariableBlur(maxBlurRadius: CGFloat, direction: VariableBlurDirection, startOffset: CGFloat) {
        // Update current values
        currentMaxBlurRadius = maxBlurRadius
        currentDirection = direction
        currentStartOffset = startOffset
        
        // Create CAFilter using Objective-C runtime
        guard let CAFilter = NSClassFromString("CAFilter") as? NSObject.Type else {
            print("[VariableBlur] Error: Can't find CAFilter class")
            return
        }
        
        guard let newVariableBlur = CAFilter.perform(NSSelectorFromString("filterWithType:"), with: "variableBlur")?.takeUnretainedValue() as? NSObject else {
            print("[VariableBlur] Error: CAFilter can't create filterWithType: variableBlur")
            return
        }
        
        // Generate new gradient image
        let gradientImage = makeGradientImage(startOffset: startOffset, direction: direction)
        
        // Configure the filter
        newVariableBlur.setValue(maxBlurRadius, forKey: "inputRadius")
        newVariableBlur.setValue(gradientImage, forKey: "inputMaskImage")
        newVariableBlur.setValue(true, forKey: "inputNormalizeEdges")
        
        // Update the backdrop layer filters
        backdropLayer?.filters = [newVariableBlur]
        
        // Cache the current filter
        variableBlur = newVariableBlur
        
        // Trigger a layout update
        setNeedsLayout()
    }
    
    open override func didMoveToWindow() {
        super.didMoveToWindow()
        // Fixes visible pixelization at unblurred edge
        guard let window, let backdropLayer = backdropLayer else { return }
        backdropLayer.setValue(window.traitCollection.displayScale, forKey: "scale")
    }
    
    open override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        // Don't call super as it crashes the app
        
        // Update scale when trait collection changes
        if let window = window, let backdropLayer = backdropLayer {
            backdropLayer.setValue(window.traitCollection.displayScale, forKey: "scale")
        }
    }
    
    private func makeGradientImage(width: CGFloat = 100, height: CGFloat = 100, startOffset: CGFloat, direction: VariableBlurDirection) -> CGImage {
        let ciGradientFilter = CIFilter.linearGradient()
        ciGradientFilter.color0 = CIColor.black
        ciGradientFilter.color1 = CIColor.clear
        ciGradientFilter.point0 = CGPoint(x: 0, y: height)
        ciGradientFilter.point1 = CGPoint(x: 0, y: startOffset * height)
        
        if case .blurredBottomClearTop = direction {
            ciGradientFilter.point0.y = 0
            ciGradientFilter.point1.y = height - ciGradientFilter.point1.y
        }
        
        return CIContext().createCGImage(ciGradientFilter.outputImage!, from: CGRect(x: 0, y: 0, width: width, height: height))!
    }
}
