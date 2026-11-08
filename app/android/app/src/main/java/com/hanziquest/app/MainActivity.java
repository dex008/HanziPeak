package com.hanziquest.app;

import android.view.KeyEvent;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            String code = null;
            switch (event.getKeyCode()) {
                case KeyEvent.KEYCODE_DPAD_UP:
                    code = "UP";
                    break;
                case KeyEvent.KEYCODE_DPAD_DOWN:
                    code = "DOWN";
                    break;
                case KeyEvent.KEYCODE_DPAD_LEFT:
                    code = "LEFT";
                    break;
                case KeyEvent.KEYCODE_DPAD_RIGHT:
                    code = "RIGHT";
                    break;
                case KeyEvent.KEYCODE_DPAD_CENTER:
                case KeyEvent.KEYCODE_ENTER:
                    code = "ENTER";
                    break;
                default:
                    break;
            }
            if (code != null) {
                final String js = "window.__hzKey && window.__hzKey('" + code + "')";
                if (bridge != null && bridge.getWebView() != null) {
                    bridge.getWebView().post(() -> bridge.getWebView().evaluateJavascript(js, null));
                }
                return true;
            }
        }
        return super.dispatchKeyEvent(event);
    }
}
