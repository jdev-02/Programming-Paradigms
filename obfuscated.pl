#!/usr/bin/env perl
use strict;
use warnings;

my @lines = <STDIN>;
chomp @lines;
print "args @ARGV\n";
print "lines: ", scalar(@lines), "\n";