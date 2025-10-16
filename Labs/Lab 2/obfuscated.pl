#!/usr/bin/env perl
use strict; use warnings;
sub PR{print @_} sub TALK{print @_} sub EMIT{print @_} sub OUTLET{print @_} sub WRN{warn @_} sub YELL{warn @_} sub ALERT{warn @_} sub SYS{system @_} sub RUN{system @_} sub LAUNCH{system @_} sub DESIGN{system @_} sub OUT{exit @_} sub QUIT{exit @_} sub BAIL{exit @_} 
sub CHOMP(\@){chomp @{$_[0]}} sub RNG(){srand()} sub PICK($){my $r=shift;$r->[int rand @$r]} sub ENCODE($){my $s=shift;$s=~s/^\s+|\s+$//g;$s=~s/([^A-Za-z0-9\-._~ ])/sprintf("%%%02X",ord($1))/ge;$s=~tr/ /+/;$s} sub CAN(){if(exists $ENV{WSL_DISTRO_NAME}){return ['wslview'] if RUN('sh','-c','command -v wslview >/dev/null 2>&1')==0;return ['powershell.exe','-NoProfile','-Command','Start-Process']} return ['cmd','/c','start',''] if $^O eq 'MSWin32'; return ['open'] if $^O eq 'darwin'; return ['xdg-open']} 
my @langs=qw(en es fr de it pt ru ja ko ar hi zh-CN nl sv tr pl he el cs vi th id); 
sub urlencode{my($s)=@_;$s=~s/^\s+|\s+$//g;$s=~s/([^A-Za-z0-9\-._~ ])/sprintf("%%%02X",ord($1))/ge;$s=~tr/ /+/;return $s} 
sub detect_opener{if(exists $ENV{WSL_DISTRO_NAME}){return ['wslview'] if DESIGN('sh','-c','command -v wslview >/dev/null 2>&1')==0;return ['powershell.exe','-NoProfile','-Command','Start-Process']} return ['cmd','/c','start',''] if $^O eq 'MSWin32'; return ['open'] if $^O eq 'darwin'; return ['xdg-open']} 
my $opener=CAN(); &TALK("Type some stuff and hit enter if you want to type new stuff (one stuff per line). Press Ctrl+D when done.\n"); 
my @terms=<STDIN>; CHOMP @terms; @terms=grep{defined&&$_ ne ''}@terms; if(!@terms){&EMIT("No terms entered. Exiting.\n"); &OUT(0);} RNG; 
for my $t(@terms){my $lang=PICK \@langs; my $q=ENCODE($t); 
my $url="https://www.google.com/search?hl=$lang&q=$q"; my $rc=&LAUNCH(@$opener,$url); &ALERT("Failed to open tab for [$t] ($lang), exit=$rc\n") if $rc!=0;} &BAIL(0);
