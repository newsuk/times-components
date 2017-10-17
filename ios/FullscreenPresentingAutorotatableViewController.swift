import UIKit

@objc
public class FullscreenPresentingAutoRotatingViewController: UIViewController {

  private class AutoPresentingView: UIView {
    
    weak var viewController: FullscreenPresentingAutoRotatingViewController?
    
    required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
    }
    
    init(with viewController: FullscreenPresentingAutoRotatingViewController) {
      self.viewController = viewController
      super.init(frame: .zero)
    }
    
    override func didAddSubview(_ subview: UIView) {
      super.didAddSubview(subview)
      
      viewController?.showInFullscreen()
    }
    
    override func willRemoveSubview(_ subview: UIView) {
      super.willRemoveSubview(subview)
      
      viewController?.hideFullScreen()
    }
  }

  // MARK:-
  
  public weak var viewControllerToPresentFrom: UIViewController?
  private var autoPresentingView: AutoPresentingView!
  
  // MARK:-
  
  override public func loadView() {
    autoPresentingView = AutoPresentingView(with: self)
    view = autoPresentingView
    modalPresentationStyle = .fullScreen
  }
  
  override public var supportedInterfaceOrientations: UIInterfaceOrientationMask {
    return .allButUpsideDown
  }
  
  override public var shouldAutorotate: Bool {
    return true
  }
}

fileprivate extension FullscreenPresentingAutoRotatingViewController {
  
  func showInFullscreen() {
    viewControllerToPresentFrom?.present(self, animated: false, completion: nil)
  }
  
  func hideFullScreen() {
    presentingViewController?.dismiss(animated: false, completion: nil)
  }
}
