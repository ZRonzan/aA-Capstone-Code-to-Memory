from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards1():
    # deck 1
    db.session.add(
        Card(
            question = "How can you include an external javascript file?",
            answer= "/script src='myfile.js'/",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "What's better, putting scripts just before the closing body tag or in the head with 'defer' attribute?",
            answer= "Sort of a wash, but old browsers don't understand 'defer' so before is probably better",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "ECMAScript is how many data types?",
            answer= "5 simple: undefined, null, number, boolean, string; and 1 complex: object",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "How do you find the data type (type) of a variable? E.g what is the type of myVar?",
            answer= "typeof myVar (no parentheses needed as typeof is an operator, not a function)",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "when should you set a variable to null?",
            answer= "When you expect it to contain a reference to an object, this way you can explicitly test to see if the variable contains a reference to null or an object",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "why is this a good or bad idea?\n if(a + b == 0.3) {do something...}",
            answer= "Bad idea: because of ECMAScript rounding errors with float variables (0.1 + 0.2 = 0.300000000003, not 0.3 as expected)",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "true/false NaN === NaN",
            answer= "False",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "how can you determine if something is NaN?",
            answer= "use isNaN()",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "How would you convert something to a number or cast something as a number?",
            answer= "Use parseInt() or Number(), however parseInt provides more consistent results",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "What is a unary operator?",
            answer= "only operates on one value, like ++, or --, as in ++var",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "if let a = 10;\n console.log(a++ + 10) will give you what?",
            answer= "20 because the ++ happens after the operation",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "if let a = 10;\n console.log(++a + 10) will give you what?",
            answer= "21 because the ++ happens before the operation",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "let a = false\n what is a++?",
            answer= "Numeric 1",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "let a = '1'\n what is +a",
            answer= "Numeric 1",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "10 % 9 = ?",
            answer= "1",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "How can you find which word alphabetically comes first between 'Brick' and 'alphabet'?",
            answer= "'Brick'.toLowerCase() < 'alphabet'.toLowerCase() // should return false",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "10 % 2 = ?",
            answer= "0",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "10 + '5' = ?",
            answer= "'105'",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "5 - '2' = ?",
            answer= "3 because '2' is converted to 2",
            deck_id = 1
        )
    )
    db.session.add(
        Card(
            question = "'a'<'b' (true or false?)",
            answer= "true",
            deck_id = 1
        )
    )

    # deck 2
    db.session.add(
        Card(
            question = "What are two ways of determining if myVar is an array?",
            answer= "1. myvar instanceof Array\n 2. Array.isArray(myVar)",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "what does the toFixed() method do? (and on what type of value?)",
            answer= "it's a method of the Number Type and it returns a string with specified number of decimal places rounded to the correct value",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "let obj = new Object();\n if(obj) {//will this take place?}",
            answer= "Yes, because objects are truthy even when empty",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "What is a function declaration compared to a function expression?",
            answer= "Declaration: function myfunc(){...}\n Expression: const myFunc(){...}",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "how would you get today's day from the date object?",
            answer= "having an array with Sunday at index 0, and saturady at index 6, then use dateobject.getDay() and get the day at that array index",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "What is function declaration hoisting?",
            answer= "Before code begins running, the JS engine 'hoists' functions to the top of the execution context. that way a function can be called even if the code doesn't appear until later in the file",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "let arr1 = [1,2,3]\n let arr2 = arr1\n arr1 = null\n what happens to arr2",
            answer= "arr2 = [1,2,3] as arr1 and arr2 were both pointing to the same reference object (an array), when arr1 is then pointed to null, arr2 is still pointing to the array",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "function f1(){...}\n letf2 = f1\n f1 = null\n what happens when you invoke f2()?",
            answer= "The function is still run as f2 still points to the created function",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "what does a for ... in loop do and what does it look like?",
            answer= "It iterates over the enumerable properties in an object like this:\n for (let prop in obj) {...} ",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "Describe the apply() vs call() function",
            answer= "Both take 2 arguments: 'this' and some optional arguments.\n  Apply takes an arguments object or an array someFunc.apply(this, [arg1, arg2, ...]); call takes a list of arguments: someFunc.call(this, arg1, arg2, ...)",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "How can a primity=icve value like 'cats' have access to methods like 'cats'.split('')?",
            answer= "Every time a primitive value is read, an object of the corresponding primitive wrapper type is created. the wrapper allows access to these methods, but is then immediately destroyed",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "let s = String;\n typeof s = ?",
            answer= "'function'",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "string.replace() takes in what arguments?",
            answer= "the pattern to match against and the thing to replace it with. the second argument can be a function to apply more logic",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "let s = new String();\n typeof s = ?",
            answer= "'object'",
            deck_id = 2
        )
    )
    db.session.add(
        Card(
            question = "What are two ways to access the Global Object?",
            answer= "1. Use window (window.property or window.method)\n 2. Return it from an anonymous function: global = function(){return this;}()",
            deck_id = 2
        )
    )

    # deck 3
    db.session.add(
        Card(
            question = "Turn let str = 'apples, bananas, oranges, pears and salsa' into an array, but without 'and salsa'",
            answer= "str.split('', 4);",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "what does someString.split('') do?",
            answer= "Converts the string into an array of its individual characters e.g. '1234 5' becomes ['1','2','3','4',' ','5']",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let arr = ['apple', 'orange', 'grape'];\n let c = arr.push('banana')\n \n what is c?",
            answer= "4, because push returns the new length of the array, not the array",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let a = [a,b,c,d,e]. what does b = a.splice() do?",
            answer= "a will become an empty array, and b will become [a,b,c,d,e]",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "soemArray.splice(arg1, arg2). what are arg1 and arg2?",
            answer= "arg1 is the index to remove from, and arg2 is the number of items to remove after that",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "Change [1,0,0,0,5] to [1,2,3,4,5]",
            answer= "thearray.splice(1,3,2,3,4)",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What is a good way of copying the contents of an array into a new array?",
            answer= "newArr = myArr.slice()",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let a = 'My string';\n let b = a.slice(1);\n what happens to a and b?",
            answer= "a is left unchanged, b is 'y string'",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "How are substr(), substring(), and slice() similar/different?",
            answer= "The first arg in all is the starting index. For substring and slice, arg2 is the ending index. FOr substr it's the total characters/elementsto take including the starting index",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "arr1 = [0,2,4], arr2 = [1,3,5].\n How can i change arr1 to [0,2,4,1,3,5]?",
            answer= "arr1 = arr1.concat(arr2) // concat is non destructive",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What are location methods?",
            answer= "indexof(array or string, [startindex]) is the first index counting forwards from the startindex lastIndexOf(array or string, [startindex]) is the first index counting backwards from the startindex",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What does the array sort functions compare function return?",
            answer= "-1, 0 or 1",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "Turn arr = ['tom', 'bill', 'jerry] into 'tom, bill, jerry'",
            answer= "arr.join(', ');",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "Name 2 ways to find the 4th characterin a string, 'cats'",
            answer= "'cats'.charAt(3) or 'cats'[3]",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "shift vs unshift",
            answer= "Shift removes the element at index 0 of an array and returns that value. Unshift adds to the beginning of an array and returns the new array length",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "When handling strings what'a handy function for dealing with white space?",
            answer= "trim(). Use this when doing things like str.split()",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What are five iteartive methods for arrays?",
            answer= "every(), some(), filter(), forEach(), map()",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "When passing a function to an iterative array, what are the parameters you can include?",
            answer= "item, index and array - the array argument is the array being ated upon",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let arr = [1,2,3,4,5,6,7,8];\n how would you create an array that had only the even values in arr?",
            answer= "let evenVals = arr.filter(ele => return ele % 2 === 0)",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let arr = [1,2,3,4,5,6,7,8];\n how would you return a copy of this array where every value is doubled?",
            answer= "let newArr = arr.map(ele => return ele * 2)",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "let arr = [1,2,3,4,5,6,7,8];\n how would you find out if every element in the array is positive?",
            answer= "let allPositive = arr.every(ele => return ele > 0)",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "How is array.filter() different to array.map()?",
            answer= "filter returns a smaller array of values that cause the filter callback to return true. Map returns an array of the same length with each element being the return value of the map callback",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What is a good way to turn an array like object into an array?",
            answer= "newArr = Array.prototype.slice.call(someNodeList) or newArr = [].slice.call(jqueryObj)",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What arguments does the myArray.reduce() functiontake and what does it return",
            answer= "it takes a callback(accumulator, currVal, idex, array) and an accumulator starting value. It returns a value",
            deck_id = 3
        )
    )
    db.session.add(
        Card(
            question = "What are 2 ways of finding if an array contains a particular value?",
            answer= "indexOf(val) > -1, and .includes(val) === true",
            deck_id = 3
        )
    )

    db.session.commit()

def seed_cards2():
    # deck 4
    db.session.add(
        Card(
            question = "Return - string\n Args - none\n ___________\n returns a string with first letter capitalized and all other characters lowercased. It doesn't modify the original string",
            answer= "string.capitalize()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - string\n Args - (width, 'some char')\n ___________\n returns a string padded on both sides with specified char. It doesn't modify the original string. If no second arg provided then blank spaces are default.",
            answer= "string.center()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - string\n Args - none\n ___________\n removes all case distinctions present in a string. It is used for caseless matching, i.e. ignores cases when comparing. For example, German lowercase letter ß is equivalent to ss. However, since ß is already lowercase, lower() method does nothing to it. But, casefold() converts it to ss.",
            answer= "string.casefold()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - int\n Args - (substring, start, end)\n ___________\n searches the substring in the given string and returns how many times the substring is present in it. It also takes optional parameters start and end to specify the starting and ending positions in the string respectively.",
            answer= "string.count()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - (suffix, start, end)\n ___________\n returns True if a string ends with the specified suffix. If not, it returns False.",
            answer= "string.endswith()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - copy of string\n Args - (tab size)\n ___________\n returns a copy of string with all tab characters '\t' replaced with whitespace characters until the next multiple of tabsize parameter.",
            answer= "string.expandtabs()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - index\n Args - (substring, start, end)\n ___________\n returns the index of first occurrence of the substring (if found). If not found, it returns -1. Start and End args are optional.\n",
            answer= "string.find()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - formatted string with inputs\n Args - (first input, second input, ...)\n ___________\n reads the type of arguments passed to it and formats it according to the format codes defined in the string. First value in given string is the argument it references and will substitute for in the given parameters, first number after colon is the number of total spaces allocated to the entire inputted argument, number after decimal with the f is the number of decimal places after the input number",
            answer= "'blah blah {0} blah blah {1:5.3f}'.format('input0', 'input2')",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - index\n Args - (substring, start, end)\n  ___________\n returns the index of a substring inside the string (if found). If the substring is not found, it raises an exception",
            answer= "string.index()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in the string are alphanumeric (either alphabets or numbers). If not, it returns False",
            answer= "string.isalnum()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in the string are alphabets. If not, it returns False.",
            answer= "string.isalpha()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in a string are decimal characters. If not, it returns False.",
            answer= "string.isdecimal()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in a string are digits. If not, it returns False",
            answer= "string.isdigit()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if the string is a valid identifier in Python. If not, it returns False.",
            answer= "string.isidentifier()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all alphabets in a string are lowercase alphabets. If the string contains at least one uppercase alphabet, it returns False.",
            answer= "string.islower()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in a string are numeric characters. If not, it returns False.",
            answer= "string.isnumeric()",
            deck_id = 4
        )
    )
    db.session.add(
        Card(
            question = "Return - True/False\n Args - none\n ___________\n returns True if all characters in the string are printable or the string is empty. If not, it returns False.\n Characters that occupies printing space on the screen are known as printable characters. For example:\n letters and symbols, digits, punctuation, whitespace",
            answer= "string.isprintable()",
            deck_id = 4
        )
    )

    # deck 5
    db.session.add(
        Card(
            question = "Return - none\n Args - ( value to remove )\n ___________\n searches for the given element in the set and removes it.\n If the element(argument) passed to the remove() method doesn't exist, keyError exception is thrown.",
            answer= "set.remove(element)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - none\n Args - ( value to add )\n ___________\n adds a given element to a set. If the element is already present, it doesn't add any element.",
            answer= "set.add(element)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - none\n Args - none\n ___________\n makes a shallow copy. It doesn't return any value.",
            answer= "set.copy()",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - none\n Args - none\n ___________\n removes all elements from the set.",
            answer= "set.clear()",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - set\n Args - ( the set you wanna subtract out )\n ___________\n returns the set difference of two sets.",
            answer= "A.difference(B)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - none\n Args - ( value to remove from set )\n ___________\n removes a specified element from the set (if present).",
            answer= "s.discard(x)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - set intersection\n Args - ( sets to intersect with )\n ___________\n returns the intersection of set A with all the sets (passed as argument).",
            answer= "A.intersection(*other_sets)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - bool\n Args - ( second set or any iterable )\n ___________\n returns True if two sets are disjoint sets. If not, it returns False.",
            answer= "set_a.isdisjoint(set_b)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - bool\n Args - ( superset you are taking subset from )\n ___________\n returns True if all elements of a set are present in another set (passed as an argument). If not, it returns False.",
            answer= "A.issubset(B)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - bool\n Args - ( subset )\n ___________\n returns True if a set has every elements of another set (passed as an argument). If not, it returns False.",
            answer= "A.issuperset(B)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - random value that is popped\n Args - none\n ___________\n removes an random/arbitrary element from the set and returns the element removed.",
            answer= "set.pop()",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - new set\n Args - ( second set )\n ___________\n returns a new set which is the symmetric difference of two sets.",
            answer= "A.symmetric_difference(B)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - new set that is union of all sets\n Args - ( other sets )\n ___________\n returns a new set with distinct elements from all the sets.",
            answer= "A.union(*other_sets)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - none\n Args - ( value to add to set, can be an iterable )\n ___________\n adds elements from a set",
            answer= "A.update(B)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - bool\n Args - ( iterable )\n ___________\n returns True if any element of an iterable is True. If not, any() returns False.",
            answer= "any(iterable)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - bool\n Args - ( iterable )\n ___________\n returns True if all elements of an iterable is True. If not, any() returns False.",
            answer= "all(iterable)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - enumerate object\n Args - ( iterable )\n ___________\n adds counter to an iterable and returns it (the enumerate object).",
            answer= "enumerate(iterable, start=0)",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - set\n Args - ( iterable )\n ___________\n constructs a Python set from the given iterable and returns it.",
            answer= "set( iterable )",
            deck_id = 5
        )
    )
    db.session.add(
        Card(
            question = "Return - sorted list\n Args - ( iterable, optional key, optional reverse )\n ___________\n returns a sorted list from the given iterable.",
            answer= "sorted( iterable, optional key, optional reverse)",
            deck_id = 5
        )
    )

    # deck 6
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --version",
            answer= "Prints the git suite version that the git program came from.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --help",
            answer= "Prints the synopsis and a list of the most commonly used commands. If the option --all or -a is given then all available commands are printed. If a git command is named this option will bring up the manual page for that command.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n -c =",
            answer= "Pass a configuration parameter to the command. The value given will override values from configuration files. The is expected in the same format as listed by git config (subkeys separated by dots).",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --exec-path[=]",
            answer= "Path to wherever your core git programs are installed. This can also be controlled by setting the GIT_EXEC_PATH environment variable. If no path is given, git will print the current setting and then exit.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --html-path",
            answer= "Print the path, without trailing slash, where git’s HTML documentation is installed and exit.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --man-path",
            answer= "Print the manpath (see man(1)) for the man pages for this version of git and exit.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --info-path",
            answer= "Print the path where the Info files documenting this version of git are installed and exit.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --paginate",
            answer= "Pipe all output into less (or if set, $PAGER) if standard output is a terminal. This overrides the pager. configuration options (see the 'Configuration Mechanism' section below).",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --no-pager",
            answer= "Do not pipe git output into a pager.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --git-dir=",
            answer= "",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n ",
            answer= "Set the path to the repository. This can also be controlled by setting the GIT_DIR environment variable. It can be an absolute path or relative path to current working directory.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --work-tree=",
            answer= "Set the path to the working tree. It can be an absolute path or a path relative to the current working directory. This can also be controlled by setting the GIT_WORK_TREE environment variable and the core.worktree configuration variable (see core.worktree in git-config(1) for a more detailed discussion).",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --bare",
            answer= "Treat the repository as a bare repository. If GIT_DIR environment is not set, it is set to the current working directory.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "What does the following Git option do?\n --no-replace-objects",
            answer= "Do not use replacement refs to replace git objects. See git-replace(1) for more information.",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "Name the Git option that does the following:\n Prints the git suite version that the git program came from.",
            answer= "--version",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "Name the Git option that does the following:\n Prints the synopsis and a list of the most commonly used commands. If the option --all or -a is given then all available commands are printed. If a git command is named this option will bring up the manual page for that command.",
            answer= "--help",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "Name the Git option that does the following:\n Pass a configuration parameter to the command. The value given will override values from configuration files. The is expected in the same format as listed by git config (subkeys separated by dots).",
            answer= "-c =",
            deck_id = 6
        )
    )
    db.session.add(
        Card(
            question = "Name the Git option that does the following:\n Path to wherever your core git programs are installed. This can also be controlled by setting the GIT_EXEC_PATH environment variable. If no path is given, git will print the current setting and then exit.",
            answer= "--exec-path[=]",
            deck_id = 6
        )
    )

    # deck 7
    db.session.add(
        Card(
            question = "What are the parts of a url?",
            answer= "protocol: domain name/parameters ? queries",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What is the DOM?",
            answer= "Document-Object-Model, a copy of the code from the server that can be manipulated with javascript",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What are the typical parts of a server js file?",
            answer= "- import external resources (i.e. Express)\n - api end points (app.get)\n - app listen with the port settings (app.listen)",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "Is Node primarily a sync or async programing language?",
            answer= "Async - it’s built on callbacks",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "How many threads does node have?",
            answer= "1 thread (thread = an operation that is happening in the same time with another one)",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What are the projects suitable for node?",
            answer= "Single thread websites with simple NoSQL DBs and API support",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What is the difference between a SQL and NoSQL database?",
            answer= "SQL is a relational data model (all data is structured the same, vertically scalable)\n NoSQL is a document data model (data can be structured differently, horizontally scalable)",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What are the three definitions of Mongoose?",
            answer= "1. A middleware connecting the Controller with the Model\n 2. “validation” layer (validates data between the controller and the model)\n 3. Object Document Mapper (maps the connection between the Documents inside the DB with the Objects in the controller)",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What is a callback function?",
            answer= "A callback is function which is sent as a parameter to another function in order to be used after the initial function runs",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What is a closure function?",
            answer= "A closure is an inner function that has access to the outer (enclosing) function's variables and the global variables",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What is a recursive function?",
            answer= "Recursive functions iterate over an operation repeatedly until it arrives at a result",
            deck_id = 7
        )
    )
    db.session.add(
        Card(
            question = "What are RESTful web services?",
            answer= "- Representational State Transfers\n Clients can make requests that elicits a response in HTML, XML or JSON format",
            deck_id = 7
        )
    )

    # deck 8
    db.session.add(
        Card(
            question = "Difference between PUT and PATCH?",
            answer= "PUT is used to update a resource and PATCH is used to modify it",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "What are common CRUD operations?",
            answer= "GET, POST, PUT, PATCH, DELETE",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "What are CRUD operations?",
            answer= "Create, Read, Update and Delete - requests made to the server in order to get a response.",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "What does MCV stand for?",
            answer= "Model (database), Controller (server), View (client)",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "What are the most common npm apps being used?",
            answer= "express, mocha, chai, morgan, faker, bcryptjs, body-parser, mongo, mongoose",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "Describe the HTTP requests/response life cycle.",
            answer= "Client sends a request - request method and path are used to route to correct request handler.\n Server sends a response object with status code and headers, and body if response has content",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "Describe the architecture of a basic Express app. How is it organized?",
            answer= "- a way to listen for HTTP requests over a port\n - a way to inspect and interact with HTTP request and response objects\n - a way to route HTTP requests from clients to the right request handlers\n - a way to serve static assets to client browsers (e.g., our route for /)\n - a way to serve data to clients",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "Describe how a Mongo database is structured",
            answer= "Mongo is made up of collections of documents.\n A document is an object comprised of keys and values. Mongo accepts strings, integers, floating point decimals, booleans, null, arrays, objects, timestamps, and object ids as value types.",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "What is the purpose of bcrypt in the authentication process?",
            answer= " authentication process?\n bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks",
            deck_id = 8
        )
    )
    db.session.add(
        Card(
            question = "How do JSON web tokens work?",
            answer= "JWT digitally signs tokens to prevent fraud. When the server generates the token, it generates a signature by combining the contents of the token with a secret private key using an encryption algorithm.",
            deck_id = 8
        )
    )
    
    db.session.commit()

def seed_cards3():
    for x in range(13):
        db.session.add(
            Card(
            question = f"User 3 test deck 1 Q{x + 1}",
            answer= f"User 3 test deck 1 A{x + 1}",
            deck_id = 9
            )
        )

    for y in range(27):
        db.session.add(
            Card(
            question = f"User 3 test deck 2 Q{y + 1}",
            answer= f"User 3 test deck 2 A{y + 1}",
            deck_id = 10
            )
        )

    db.session.commit()

def seed_cards4():
    for x in range(22):
        db.session.add(
            Card(
            question = f"User 4 test deck Q{x + 1}",
            answer= f"User 4 test deck A{x + 1}",
            deck_id = 11
            )
        )

    db.session.commit()

def seed_cards5():
    for x in range(35):
        db.session.add(
            Card(
            question = f"User 5 test deck Q{x + 1}",
            answer= f"User 5 test deck A{x + 1}",
            deck_id = 12
            )
        )

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
