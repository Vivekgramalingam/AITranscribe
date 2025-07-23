import math  # Bringing in math to make some calculations easier.


class InputLengthError(
    Exception):  # We also will build an error class for user input that can be used for our various modes.
    """Raised when user inputs too many or not enough values for the mode."""
    pass


# If I was using more error classes, I would make a general error class to put the error classes in, but since this is the only one I needed, I didn't feel the need to.

# I'm going to put some strings that will be used in various places here. I can't remember if we covered str.format and fstrings in class, but I found people talking about it in a thread on stack overflow so I just went for it, I hope that is okay.
# General explanatory text
in_req = """Please give the following inputs, formatted like this: {0}
Alternatively, you can type 'back' if you would like to return to the main menu."""
in_error = """
Something may be wrong with your input.
Please make sure it is formatted '{0}', there are exactly {1} inputs, and that all inputs are numbers.
For debugging purposes, here is input received.
"""
# Mode-specific explanations
cart_tut = "This will calculate Cartesian distance."
mat_tut = """Vector x Matrix takes a 3-value vector and multiplies it with a 3x3 matrix.
Please ensure that you provide the three values for the vector first, followed by the 9 matrix values in row major order."""
norm_tut = "Normalize will take a 3-value vector and shrink it to unit length."

# Expected inputs
exp_cart = "x1, y1, x2, y2"
exp_mat = "v1, v2, v3, m11, m12, m13, m21, m22, m23, m31, m32, m33"
exp_norm = "v1, v2, v3"


# I will also make a sort of wrapper function that frames the functions provided to the user to reduce redundancy.
def run_mode(exp_in, exp_len, tutorial, function):
    u_in = []  # First we make the user input to use for the while loop, or clear it.
    print(f"\n{tutorial}")  # Printing information about the particular mode
    print(in_req.format(exp_in))  # Prints the input explanation prompt set up previously.
    # We will use a while loop to keep the user in the same mode in case they put in their input improperly.
    # We can also use the while loop's end parameter to let the user exit early if they chose the wrong mode by mistake.
    while u_in != 'back':
        u_in = input("Enter input: ")
        if u_in == 'back':
            print("Returning to main menu.")
        else:
            u_list = u_in.split(", ")
            try:
                if len(u_list) != exp_len:  # Checking if user provided correct amount of variables.
                    raise InputLengthError
                for i in range(exp_len):
                    u_list[i] = float(
                        u_list[i])  # Converting to float. This also can fail if user did not input numbers.
                function(u_list)
                u_in = "back"
                print("\nReturning to main menu now.\n")
            except:
                print(in_error.format(exp_in, exp_len))
                print(u_list, "\n")


# Now I'll define the functions run within the run_mode function for the particular mode selected.
def cart(cart_list):
    x1 = cart_list[0]
    y1 = cart_list[1]
    x2 = cart_list[2]
    y2 = cart_list[3]
    cart_out = math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
    # We will print the values our program interprets for the user, so they can double-check it entered as intended.
    print(
        "\nFor the given values:\n")  # I format things like this within functions because the triple quote mode was weird with indents.
    print(f"x1: {x1} \t y1: {y1}")
    print(f"x2: {x2} \t y2: {y2}")
    print(f"\nThe calculated Cartesian distance is: {cart_out}")


def mat(mat_list):
    v = mat_list[0:3]
    m1 = mat_list[3:6]
    m2 = mat_list[6:9]
    m3 = mat_list[9:12]
    matrix = [m1, m2, m3]
    mat_out = [0, 0, 0]
    for i in range(3):
        m = matrix[i]
        for j in range(3):
            mat_out[i] += m[j] * v[j]
    print("\nFor the given values:\n")
    print(f"v1: {v[0]} \t v2: {v[1]} \t v3: {v[2]}\n")
    print(f"m11: {m1[0]} \t m12: {m1[1]} \t m13: {m1[2]}")
    print(f"m21: {m2[0]} \t m22: {m2[1]} \t m23: {m2[2]}")
    print(f"m31: {m3[0]} \t m32: {m3[1]} \t m33: {m3[2]}")
    print(f"\nThe resulting vector is: {mat_out}")


def norm(norm_list):
    if norm_list == [0, 0, 0]:
        print("\nA vector of all 0's cannot be normalized.")
    else:
        v1 = norm_list[0]
        v2 = norm_list[1]
        v3 = norm_list[2]
        norm_len = math.sqrt((v1 ** 2) + (v2 ** 2) + (v3 ** 2))
        norm_out = [v1 / norm_len, v2 / norm_len, v3 / norm_len]
        print("\nFor the given values:\n")
        print(f"v1: {v1} \t v2: {v2} \t v3: {v3}")
        print(f"\nThe normalized vector is: {norm_out}")


mode = 0  # Initializing with mode set at 0 so the while loop can function.
while mode != '4':  # This will let the program restart to continue to use until the user enters '4' to quit.
    # First we print our welcome statement and instructions.
    print("""
Hello! Welcome to the project 1 calculator.
Please select from the following options:
    1. Cartesian distance
    2. Vector x matrix
    3. Normalize
    4. Quit
    """)
    # Now we take the user's input to use the calculator.
    mode = input("Enter command:")
    if mode == '1':
        run_mode(exp_in=exp_cart, exp_len=4, tutorial=cart_tut, function=cart)
    elif mode == '2':
        run_mode(exp_in=exp_mat, exp_len=12, tutorial=mat_tut, function=mat)
    elif mode == '3':
        run_mode(exp_in=exp_norm, exp_len=3, tutorial=norm_tut, function=norm)
    elif mode == '4':
        print("Shutting down. Thank you for using the project 1 calculator.")
    else:
        print("Unexpected input. Please enter only the number 1, 2, 3, or 4.")