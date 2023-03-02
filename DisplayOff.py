import RPi.GPIO as GPIO
import sys
enable = 18   # PIN 12 - always high to show data
GPIO.setwarnings(False)
# Use "GPIO" pin numbering
GPIO.setmode(GPIO.BCM)
# Set LED pin as output
GPIO.setup(enable, GPIO.OUT)
action= sys.argv[1]
if action == "off":
    GPIO.output(enable, GPIO.LOW)
    print(action + " done")
elif action == "on":
    GPIO.output(enable, GPIO.HIGH)
    print(action + " done")
else:
    print(action + " NO Action")
