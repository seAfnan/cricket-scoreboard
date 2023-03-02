import RPi.GPIO as GPIO
import sys
import os

action= sys.argv[1]
if action == "reboot":
    os.system("sudo reboot")
    print(action + " done")
else:
    print(action + " NO Action")