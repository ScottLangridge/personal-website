import * as React from "react";
import {useState} from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
    SimpleGrid,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stat,
    StatLabel,
    StatNumber,
    OrderedList,
    ListItem,
    Card,
    CardHeader,
    CardBody,
    HStack,
    VStack,
    Divider,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    IconButton,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export default function CoffeeSplitCalculator() {
    const {colorMode, toggleColorMode} = useColorMode();
    const subtleText = useColorModeValue("gray.600", "gray.400");
    const mutedText = useColorModeValue("gray.500", "gray.500");
    const cardBg = useColorModeValue("gray.50", "gray.700");
    const chartBg = useColorModeValue("#f7fafc", "#2D3748");
    const gridLine = useColorModeValue("#e2e8f0", "#4A5568");
    const tickText = useColorModeValue("#718096", "#A0AEC0");
    const lineFill = useColorModeValue("#718096", "#A0AEC0");

    const [shippingToBuyerCost, setShippingToBuyerCost] = useState("");
    const [packagingCost, setPackagingCost] = useState("");
    const [bagWeight, setBagWeight] = useState("");
    const [bagCost, setBagCost] = useState("");
    const [shippingCost, setShippingCost] = useState("");
    const [minBuyers, setMinBuyers] = useState("");
    const [maxBuyers, setMaxBuyers] = useState("");
    const [simulateUpTo, setSimulateUpTo] = useState("");

    const clampOnBlur = (setter: (v: string) => void, min: number) =>
        (e: React.FocusEvent<HTMLInputElement>) => {
            const v = e.target.value;
            if (v === "") return;
            const n = parseFloat(v);
            if (isNaN(n) || n < min) setter(String(min));
        };

    const onMinBuyersBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        clampOnBlur(setMinBuyers, 1)(e);
        const v = e.target.value;
        if (v === "") return;
        const n = parseFloat(v);
        const min = isNaN(n) ? 1 : Math.max(n, 1);
        if (maxBuyers !== "" && parseFloat(maxBuyers) < min) setMaxBuyers(String(min));
        if (simulateUpTo !== "" && parseFloat(simulateUpTo) < min) setSimulateUpTo(String(min));
    };

    const w = parseFloat(bagWeight);
    const maxB = parseFloat(maxBuyers);
    const cost = parseFloat(bagCost);
    const ship = parseFloat(shippingCost);
    const shipToBuyer = parseFloat(shippingToBuyerCost);
    const pkg = parseFloat(packagingCost);

    const hasInputs = [w, maxB, cost].every(v => !isNaN(v) && v > 0)
        && [ship, shipToBuyer, pkg].every(v => !isNaN(v) && v >= 0);

    const minCoffee = hasInputs ? Math.floor(w / maxB) : NaN;
    const minB = parseFloat(minBuyers);
    const maxCoffee = hasInputs && !isNaN(minB) && minB > 0 ? Math.floor(w / minB) : NaN;
    const costPerGram = hasInputs ? (cost + ship) / w : NaN;
    const floorPence = (v: number) => Math.floor(v * 100) / 100;
    const ceilPence = (v: number) => Math.ceil(v * 100) / 100;
    const minPrice = floorPence(minCoffee * costPerGram);
    const maxPrice = ceilPence(maxCoffee * costPerGram);
    const flatCosts = shipToBuyer + pkg;
    const minTotalPrice = floorPence(minPrice + flatCosts);
    const maxTotalPrice = ceilPence(maxPrice + flatCosts);

    const fmt = (v: number) => isNaN(v) ? "—" : `£${v.toFixed(2)}`;
    const fmtG = (v: number) => isNaN(v) ? "—" : `${v}g`;

    const simTo = parseFloat(simulateUpTo);
    const upTo = hasInputs && !isNaN(minB) && minB > 0
        ? (!isNaN(simTo) && simTo >= minB ? simTo : maxB * 2)
        : 0;
    const simRows = hasInputs && !isNaN(minB) && minB > 0
        ? Array.from({length: upTo - minB + 1}, (_, i) => {
            const buyers = minB + i;
            const bags = Math.ceil(buyers / maxB);
            const gPerBuyer = Math.floor((bags * w) / buyers);
            const pricePerBuyer = ceilPence(gPerBuyer * costPerGram + flatCosts);
            const pricePerGram = ceilPence(pricePerBuyer / gPerBuyer);
            return {buyers, bags, gPerBuyer, pricePerBuyer, pricePerGram};
        })
        : [];

    const poundInput = (label: string, value: string, setter: (v: string) => void, min: number, step: string) => (
        <FormControl>
            <FormLabel fontSize="sm" mb={1}>{label}</FormLabel>
            <InputGroup size="sm">
                <InputLeftAddon>£</InputLeftAddon>
                <Input
                    type="number"
                    min={min}
                    step={step}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    onBlur={clampOnBlur(setter, min)}
                />
            </InputGroup>
        </FormControl>
    );

    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={8} align="stretch">
                <Box>
                    <HStack justify="space-between" align="start">
                        <Heading size="lg" mb={3}>Coffee Split Calculator</Heading>
                        <IconButton
                            aria-label="Toggle dark mode"
                            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                            variant="ghost"
                            size="md"
                        />
                    </HStack>
                    <Text color={subtleText} mb={4}>
                        Figure out pricing when splitting coffee bags between multiple buyers.
                    </Text>
                    <Card variant="outline" bg={cardBg}>
                        <CardBody py={3} px={4}>
                            <OrderedList spacing={1} fontSize="sm" color={subtleText}>
                                <ListItem>Enter the <strong>flat costs</strong> that apply to each buyer: shipping and packaging.</ListItem>
                                <ListItem>Enter the <strong>bag details</strong>: weight, cost, and the retailer's shipping charge.</ListItem>
                                <ListItem>Set the <strong>min and max buyers per bag</strong> to define how a bag can be split.</ListItem>
                                <ListItem>Check the <strong>outputs</strong> for price ranges and the simulation table.</ListItem>
                            </OrderedList>
                        </CardBody>
                    </Card>
                </Box>

                <Divider />

                <SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
                    <Card variant="outline">
                        <CardHeader pb={2}>
                            <Heading size="sm">Flat Costs</Heading>
                            <Text fontSize="xs" color={mutedText}>Per buyer, regardless of coffee amount</Text>
                        </CardHeader>
                        <CardBody pt={2}>
                            <VStack spacing={4}>
                                {poundInput("Shipping to buyer", shippingToBuyerCost, setShippingToBuyerCost, 0, "0.01")}
                                {poundInput("Packaging", packagingCost, setPackagingCost, 0, "0.01")}
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card variant="outline">
                        <CardHeader pb={2}>
                            <Heading size="sm">Bag Details</Heading>
                            <Text fontSize="xs" color={mutedText}>The coffee bag being split</Text>
                        </CardHeader>
                        <CardBody pt={2}>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel fontSize="sm" mb={1}>Weight</FormLabel>
                                    <InputGroup size="sm">
                                        <Input
                                            type="number"
                                            min={1}
                                            step="1"
                                            value={bagWeight}
                                            onChange={e => setBagWeight(e.target.value)}
                                            onBlur={clampOnBlur(setBagWeight, 1)}
                                        />
                                        <InputRightAddon>g</InputRightAddon>
                                    </InputGroup>
                                </FormControl>
                                {poundInput("Cost", bagCost, setBagCost, 0.01, "0.01")}
                                {poundInput("Retailer shipping", shippingCost, setShippingCost, 0, "0.01")}
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card variant="outline">
                        <CardHeader pb={2}>
                            <Heading size="sm">Buyers</Heading>
                            <Text fontSize="xs" color={mutedText}>How many ways a bag can be split</Text>
                        </CardHeader>
                        <CardBody pt={2}>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel fontSize="sm" mb={1}>Min per bag</FormLabel>
                                    <Input
                                        size="sm"
                                        type="number"
                                        min={1}
                                        step="1"
                                        value={minBuyers}
                                        onChange={e => setMinBuyers(e.target.value)}
                                        onBlur={onMinBuyersBlur}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize="sm" mb={1}>Max per bag</FormLabel>
                                    <Input
                                        size="sm"
                                        type="number"
                                        min={minBuyers || "1"}
                                        step="1"
                                        value={maxBuyers}
                                        onChange={e => setMaxBuyers(e.target.value)}
                                        onBlur={clampOnBlur(setMaxBuyers, parseFloat(minBuyers) || 1)}
                                    />
                                </FormControl>
                            </VStack>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                <Divider />

                <Box>
                    <Heading size="md" mb={4}>Results</Heading>
                    <SimpleGrid columns={{base: 2, md: 3, lg: 6}} spacing={4}>
                        <Stat>
                            <StatLabel fontSize="xs">Min coffee/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmtG(minCoffee)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel fontSize="xs">Max coffee/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmtG(maxCoffee)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel fontSize="xs">Min price/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmt(minPrice)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel fontSize="xs">Max price/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmt(maxPrice)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel fontSize="xs">Min total/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmt(minTotalPrice)}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel fontSize="xs">Max total/buyer</StatLabel>
                            <StatNumber fontSize="lg">{fmt(maxTotalPrice)}</StatNumber>
                        </Stat>
                    </SimpleGrid>
                </Box>

                <Divider />

                <Box>
                    <HStack mb={4} spacing={4} align="end">
                        <Heading size="md">Simulation</Heading>
                        <FormControl maxW="160px">
                            <InputGroup size="sm">
                                <InputLeftAddon fontSize="xs">up to</InputLeftAddon>
                                <Input
                                    type="number"
                                    min={minBuyers || "1"}
                                    step="1"
                                    value={simulateUpTo}
                                    onChange={e => setSimulateUpTo(e.target.value)}
                                    onBlur={clampOnBlur(setSimulateUpTo, parseFloat(minBuyers) || 1)}
                                />
                                <InputRightAddon fontSize="xs">buyers</InputRightAddon>
                            </InputGroup>
                        </FormControl>
                    </HStack>

                    {simRows.length > 1 && (() => {
                        const pad = {top: 20, right: 55, bottom: 40, left: 55};
                        const chartH = 300;

                        const prices = simRows.map(r => r.pricePerBuyer);
                        const rawMinP = Math.min(...prices);
                        const rawMaxP = Math.max(...prices);
                        const pPad = Math.max((rawMaxP - rawMinP) * 0.15, 0.10);
                        const minP = Math.floor((rawMinP - pPad) * 10) / 10;
                        const maxP = Math.ceil((rawMaxP + pPad) * 10) / 10;
                        const rangeP = maxP - minP || 1;

                        const grams = simRows.map(r => r.gPerBuyer);
                        const rawMinG = Math.min(...grams);
                        const rawMaxG = Math.max(...grams);
                        const gPad = Math.max((rawMaxG - rawMinG) * 0.15, 5);
                        const minG = Math.floor(rawMinG - gPad);
                        const maxG = Math.ceil(rawMaxG + gPad);
                        const rangeG = maxG - minG || 1;

                        const minX = simRows[0].buyers;
                        const maxX = simRows[simRows.length - 1].buyers;
                        const rangeX = maxX - minX || 1;

                        const chartW = 800;
                        const plotW = chartW - pad.left - pad.right;
                        const plotH = chartH - pad.top - pad.bottom;

                        const x = (v: number) => pad.left + ((v - minX) / rangeX) * plotW;
                        const yP = (v: number) => pad.top + plotH - ((v - minP) / rangeP) * plotH;

                        const pricePoints = simRows.map(r => `${x(r.buyers)},${yP(r.pricePerBuyer)}`).join(" ");

                        const yTicks = 5;
                        const pTickValues = Array.from({length: yTicks + 1}, (_, i) => minP + (rangeP * i) / yTicks);
                        const gTickValues = Array.from({length: yTicks + 1}, (_, i) => Math.round(minG + (rangeG * i) / yTicks));
                        const xTickStep = Math.max(1, Math.ceil(rangeX / 10));
                        const xTickValues: number[] = [];
                        for (let v = minX; v <= maxX; v += xTickStep) xTickValues.push(v);

                        const gToP = (g: number) => minP + ((g - minG) / rangeG) * rangeP;

                        return (
                            <Box>
                                <Heading size="sm" mb={3}>Price & Grams per Buyer</Heading>
                                <Box overflowX="auto">
                                    <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" style={{fontFamily: "inherit"}}>
                                        <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill={chartBg} />
                                        {pTickValues.map(v => (
                                            <line key={v} x1={pad.left} x2={chartW - pad.right} y1={yP(v)} y2={yP(v)} stroke={gridLine} />
                                        ))}
                                        {pTickValues.map(v => (
                                            <text key={v} x={pad.left - 8} y={yP(v) + 4} textAnchor="end" fontSize={11} fill={tickText}>£{v.toFixed(2)}</text>
                                        ))}
                                        {gTickValues.map((v, i) => (
                                            <text key={i} x={chartW - pad.right + 8} y={yP(gToP(v)) + 4} textAnchor="start" fontSize={11} fill={tickText}>{v}g</text>
                                        ))}
                                        {xTickValues.map(v => (
                                            <text key={v} x={x(v)} y={chartH - pad.bottom + 18} textAnchor="middle" fontSize={11} fill={tickText}>{v}</text>
                                        ))}
                                        <text x={chartW / 2} y={chartH - 4} textAnchor="middle" fontSize={12} fill={tickText}>Buyers</text>
                                        <polyline fill="none" stroke={lineFill} strokeWidth={2} points={pricePoints} />
                                        {simRows.map(r => (
                                            <circle key={r.buyers} cx={x(r.buyers)} cy={yP(r.pricePerBuyer)} r={3} fill={lineFill} />
                                        ))}
                                    </svg>
                                </Box>
                            </Box>
                        );
                    })()}

                    {simRows.length > 0 && (
                        <Box overflowX="auto">
                            <Table size="sm" variant="striped">
                                <Thead>
                                    <Tr>
                                        <Th>Buyers</Th>
                                        <Th>Bags</Th>
                                        <Th>g / Buyer</Th>
                                        <Th>Price / Buyer</Th>
                                        <Th>Price / g</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {simRows.map(row => (
                                        <Tr key={row.buyers}>
                                            <Td>{row.buyers}</Td>
                                            <Td>{row.bags}</Td>
                                            <Td>{row.gPerBuyer}</Td>
                                            <Td>{fmt(row.pricePerBuyer)}</Td>
                                            <Td>{fmt(row.pricePerGram)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    )}
                </Box>
            </VStack>
        </Container>
    );
}
