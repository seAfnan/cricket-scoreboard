import RPi.GPIO as GPIO
import time
import sys

# Pin definitions
data = 17
clock = 27
strobe = 22   # PIN 15
enable = 18   # PIN 12 - always high to show data
# Suppress warnings
GPIO.setwarnings(False)
# Use "GPIO" pin numbering
GPIO.setmode(GPIO.BCM)
# Set LED pin as output
GPIO.setup(data, GPIO.OUT)
GPIO.setup(clock, GPIO.OUT)
GPIO.setup(strobe, GPIO.OUT)
GPIO.setup(enable, GPIO.OUT)

def binaryData(idx):    
     switcher2 = {
            '-':'00000000',
            '0':'00000000',
            '1':'10000000',
            '2':'01000000',
            '3':'00100000',
            '4':'00010000',
            '5':'00001000',
            '6':'00000100',
            '7':'00000010',
            '8':'00000001',
            '9':'00000000'
            }
     switcher = {
            '-':'00000000',
            '0':'01111111',
            '1':'00010001',
            '2':'10111110',
            '3':'10111011',
            '4':'11011001',
            '5':'11101011',
            '6':'11101111',
            '7':'00110001',
            '8':'11111111',
            '9':'11111011'
         }             
     return switcher.get(idx,"Not Found")
    
pattern= sys.argv[1]   
if pattern == '1':
    scoreStr = '88888888888888888888888'
elif pattern == '2':
    scoreStr = '5454354543-554354354543'
print(scoreStr)
#scoreStr='55'
#nBits =0
GPIO.output(enable, GPIO.HIGH)
#print(binary)
if len(scoreStr) == 23:
    for iNum in range(len(scoreStr)):
        binary=binaryData(scoreStr[iNum])
        for iBit in range(len(binary)):
            bitVal = binary[iBit]
          # nBits = nBits + 1
            if bitVal == '1':
                GPIO.output(data, GPIO.HIGH)  # Turn LED off
                GPIO.output(clock, GPIO.HIGH) # Turn LED on
                GPIO.output(clock, GPIO.LOW)  # Turn LED off
                GPIO.output(data, GPIO.LOW)  # Turn LED off
            else:
                GPIO.output(data, GPIO.LOW)  # Turn LED off
                GPIO.output(clock, GPIO.HIGH) # Turn LED on
                GPIO.output(clock, GPIO.LOW)  # Turn LED off
                GPIO.output(data, GPIO.LOW)  # Turn LED off
                
    GPIO.output(strobe, GPIO.HIGH)
    GPIO.output(strobe, GPIO.LOW)
else:
    print("Error- Different String")

print("DONE")